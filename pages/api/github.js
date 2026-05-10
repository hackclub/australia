import { normalizeGitHubCommitUrl } from '../../lib/helpers'

const isRelevantEventType = type =>
  ['PushEvent', 'PullRequestEvent', 'WatchEvent'].includes(type)

const getMessage = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return payload.commits?.[0]?.message || 'No commit message'
    case 'PullRequestEvent':
      return payload.pull_request?.title || `pull request on ${repo.name}`
    case 'WatchEvent':
      return `starred ${repo.name}`
    default:
      return null
  }
}

const getUrl = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return payload.commits?.[0]?.url
        ? normalizeGitHubCommitUrl(payload.commits[0].url)
        : `https://github.com/${repo.name}`
    case 'PullRequestEvent':
      return (
        payload.pull_request?.html_url || `https://github.com/${repo.name}`
      )
    case 'WatchEvent':
      return `https://github.com/${repo.name}`
    default:
      return `https://github.com/hackclub`
  }
}

export async function fetchGitHub() {
  try {
    const headers = { accept: 'application/vnd.github+json' }
    if (process.env.GITHUB_TOKEN) {
      headers.authorization = `token ${process.env.GITHUB_TOKEN}`
    }
    const res = await fetch('https://api.github.com/orgs/hackclub/events', {
      headers
    })
    if (!res.ok) return []
    const initialGitHubData = await res.json()
    if (!Array.isArray(initialGitHubData)) return []

    return initialGitHubData
      .filter(({ type }) => isRelevantEventType(type))
      .map(({ type, actor, payload, repo, created_at }) => ({
        type,
        user: actor.login,
        userImage: actor.avatar_url,
        url: getUrl(type, payload, repo) ?? `https://github.com/hackclub`,
        message: getMessage(type, payload, repo) ?? '',
        time: created_at
      }))
  } catch (err) {
    console.warn('Failed to fetch GitHub events:', err.message)
    return []
  }
}

export default async function github(req, res) {
  const git = await fetchGitHub(req, res)
  res.json(git)
}
