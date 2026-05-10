export async function getGames() {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/hackclub/sprig/main/games/metadata.json'
    )
    if (!res.ok) return []
    const games = await res.json()
    return games
      .sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn))
      .slice(-4)
  } catch (err) {
    console.warn('Failed to fetch Sprig games metadata:', err.message)
    return []
  }
}

export default async function Games(req, res) {
  const games = await getGames()
  res.json(games)
}
