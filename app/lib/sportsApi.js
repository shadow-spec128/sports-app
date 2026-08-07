const API_KEY = "123";
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

export const LEAGUES = [
  { id: "4328", name: "Premier League", query: "English_Premier_League", sport: "Football" },
  { id: "4335", name: "La Liga", query: "Spanish_La_Liga", sport: "Football" },
  { id: "4331", name: "Bundesliga", query: "German_Bundesliga", sport: "Football" },
  { id: "4332", name: "Serie A", query: "Italian_Serie_A", sport: "Football" },
  { id: "4334", name: "Ligue 1", query: "French_Ligue_1", sport: "Football" },
  { id: "4346", name: "MLS", query: "American_Major_League_Soccer", sport: "Football" },
  { id: "4387", name: "NBA", query: "NBA", sport: "Basketball" },
  { id: "4391", name: "NFL", query: "NFL", sport: "American Football" },
  { id: "4380", name: "NHL", query: "NHL", sport: "Ice Hockey" },
  { id: "4424", name: "MLB", query: "MLB", sport: "Baseball" },
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

export async function getTeamDetails(teamId) {
  const res = await fetch(`${BASE_URL}/lookupteam.php?id=${teamId}`, { cache: "no-store" });
  const data = await res.json();
  return data.teams?.[0] || null;
}

export async function getTeamNextMatch(teamId) {
  const res = await fetch(`${BASE_URL}/eventsnext.php?id=${teamId}`, { cache: "no-store" });
  const data = await res.json();
  const list = data.events || [];
  return list[0] || null;
}

export async function getTeamLastMatch(teamId) {
  const res = await fetch(`${BASE_URL}/eventslast.php?id=${teamId}`, { cache: "no-store" });
  const data = await res.json();
  const list = data.results || data.events || [];
  return list[0] || null;
}

export async function getTeamPlayers(teamId) {
  const res = await fetch(`${BASE_URL}/lookup_all_players.php?id=${teamId}`, { cache: "no-store" });
  const data = await res.json();
  return data.player || data.players || [];
}