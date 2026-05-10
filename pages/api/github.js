import { normalizeGitHubCommitUrl } from '../../lib/helpers'

const isRelevantEventType = type =>
  ['PushEvent', 'PullRequestEvent', 'WatchEvent'].includes(type)

const HACKCLUB_GITHUB_URL = 'https://github.com/hackclub'

const getRepoUrl = repo =>
  repo?.name ? `https://github.com/${repo.name}` : HACKCLUB_GITHUB_URL

const getBranchName = ref => ref?.replace('refs/heads/', '')

const getMessage = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return (
        payload?.commits?.[0]?.message ||
        (getBranchName(payload?.ref)
          ? `pushed to ${getBranchName(payload.ref)}`
          : `pushed to ${repo?.name || 'GitHub'}`)
      )
    case 'PullRequestEvent':
      return (
        payload?.pull_request?.title ||
        `${payload?.action || 'updated'} PR #${payload?.number || ''} in ${
          repo?.name || 'hackclub'
        }`.trim()
      )
    case 'WatchEvent':
      return repo?.name ? `starred ${repo.name}` : 'starred a repository'
    default:
      return null
  }
}

const getUrl = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return payload?.commits?.[0]?.url
        ? normalizeGitHubCommitUrl(payload.commits[0].url)
        : payload?.head && repo?.name
          ? `https://github.com/${repo.name}/commit/${payload.head}`
          : payload?.ref && repo?.name
            ? `https://github.com/${repo.name}/tree/${getBranchName(payload.ref)}`
            : getRepoUrl(repo)
    case 'PullRequestEvent':
      return payload?.pull_request?.html_url ||
        (payload?.number && repo?.name
          ? `https://github.com/${repo.name}/pull/${payload.number}`
          : getRepoUrl(repo))
    case 'WatchEvent':
      return getRepoUrl(repo)
    default:
      return HACKCLUB_GITHUB_URL
  }
}

export async function fetchGitHub() {
  const initialGitHubData = await fetch(
    'https://api.github.com/orgs/hackclub/events'
  ).then(r => r.json())

  const gitHubData = initialGitHubData
    .filter(({ type }) => isRelevantEventType(type))
    .map(({ type, actor, payload, repo, created_at }) => ({
      type,
      user: actor?.login || 'hackclub',
      userImage: actor?.avatar_url || null,
      url: getUrl(type, payload, repo),
      message: getMessage(type, payload, repo),
      time: created_at || null
    }))

  return gitHubData
}

export default async function github(req, res) {
  const git = await fetchGitHub(req, res)
  res.json(git)
}
