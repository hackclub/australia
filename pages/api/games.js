const SPRIG_GALLERY_URL = 'https://sprig.hackclub.com/api/gallery'

export async function getGames() {
  const response = await fetch(SPRIG_GALLERY_URL)

  if (!response.ok) {
    console.warn(
      `Failed to fetch Sprig gallery metadata: ${response.status} ${response.statusText}`
    )
    return []
  }

  const games = await response.json()

  if (!Array.isArray(games)) {
    console.warn('Sprig gallery metadata response was not an array')
    return []
  }

  return games
    .sort(
      (a, b) =>
        new Date(b.addedOn || b['added on']) -
        new Date(a.addedOn || a['added on'])
    )
    .slice(0, 4)
}

export default async function Games(req, res) {
  const games = await getGames()
  res.json(games)
}
