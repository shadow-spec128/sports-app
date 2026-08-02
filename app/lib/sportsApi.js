const API_KEY = "123"; // TheSportsDB's shared public test key — safe to hardcode, not a personal secret

const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

export async function getTeamsByLeague(leagueName) {
  const res = await fetch(`${BASE_URL}/search_all_teams.php?l=${leagueName}`);
  const data = await res.json();
  return data.teams || [];
}