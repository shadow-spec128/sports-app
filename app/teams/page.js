import { getTeamsByLeague } from "@/app/lib/sportsApi";
import { saveFavoriteTeam } from "@/app/lib/actions";

export default async function TeamsPage() {
  const teams = await getTeamsByLeague("English_Premier_League");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Premier League Teams</h1>
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