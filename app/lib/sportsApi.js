const API_KEY = "123";
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

export const LEAGUES = [
  { id: "4328", name: "Premier League", query: "English_Premier_League" },
  { id: "4335", name: "La Liga", query: "Spanish_La_Liga" },
  { id: "4387", name: "NBA", query: "NBA" },
  { id: "4391", name: "NFL", query: "NFL" },
  { id: "4380", name: "NHL", query: "NHL" },
];

export async function getTeamsByLeague(leagueQuery) {
  const res = await fetch(`${BASE_URL}/search_all_teams.php?l=${leagueQuery}`, { cache: "no-store" });
  const data = await res.json();
  return data.teams || [];
}

export async function getUpcomingMatches(leagueId) {
  const res = await fetch(`${BASE_URL}/eventsnextleague.php?id=${leagueId}`, { cache: "no-store" });
  const data = await res.json();
  return data.events || [];
}