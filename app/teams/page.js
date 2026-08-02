import { getTeamsByLeague, getUpcomingMatches } from "@/app/lib/sportsApi";
import { saveFavoriteTeam } from "@/app/lib/actions";
import Link from "next/link";

export default async function TeamsPage() {
  const teams = await getTeamsByLeague("English_Premier_League");
  const matches = await getUpcomingMatches(4328); // 4328 = Premier League's ID on TheSportsDB

  return (
    <div style={{ padding: "2rem" }}>
      <Link href="/">← Back to Home</Link>

      <h1>Upcoming Premier League Matches</h1>
      <ul>
        {matches.length === 0 && <li>No upcoming matches found right now.</li>}
        {matches.map((match) => (
          <li key={match.idEvent} style={{ marginBottom: "0.5rem" }}>
            {match.strHomeTeam} vs {match.strAwayTeam} — {match.dateEvent} {match.strTime}
          </li>
        ))}
      </ul>

      <h1 style={{ marginTop: "2rem" }}>Premier League Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.idTeam} style={{ marginBottom: "1rem" }}>
            <img
              src={team.strBadge}
              alt={team.strTeam}
              style={{ width: "40px", verticalAlign: "middle", marginRight: "10px" }}
            />
            {team.strTeam}
            <form action={saveFavoriteTeam} style={{ display: "inline", marginLeft: "10px" }}>
              <input type="hidden" name="apiTeamId" value={team.idTeam} />
              <input type="hidden" name="teamName" value={team.strTeam} />
              <button type="submit">Save to Favorites</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}