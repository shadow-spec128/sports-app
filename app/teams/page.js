import { getTeamsByLeague, getUpcomingMatches, LEAGUES } from "@/app/lib/sportsApi";
import { saveFavoriteTeam } from "@/app/lib/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TeamsPage({ searchParams }) {
  const params = await searchParams;
  const leagueId = params.league || "4328";
  const currentLeague = LEAGUES.find((l) => l.id === leagueId) || LEAGUES[0];

  const teams = await getTeamsByLeague(currentLeague.query);
  const matches = await getUpcomingMatches(currentLeague.id);

  const sports = [...new Set(LEAGUES.map((l) => l.sport))];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 text-sm">
          ← Back to Home
        </Link>

        <div className="mt-6 mb-8 space-y-4">
          {sports.map((sport) => (
            <div key={sport}>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">{sport}</p>
              <div className="flex gap-2 flex-wrap">
                {LEAGUES.filter((l) => l.sport === sport).map((league) => (
                  <a
                    key={league.id}
                    href={`/teams?league=${league.id}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      league.id === leagueId
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                    }`}
                  >
                    {league.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold mb-3">Upcoming {currentLeague.name} Matches</h1>
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 mb-10">
          {matches.length === 0 && (
            <p className="text-slate-400 text-sm">No upcoming matches found right now.</p>
          )}
          {matches.map((match) => (
            <div key={match.idEvent} className="text-slate-200">
              <span className="font-medium">{match.strHomeTeam}</span>
              <span className="text-slate-500 mx-2">vs</span>
              <span className="font-medium">{match.strAwayTeam}</span>
              <span className="text-slate-500 ml-3 text-sm">
                {match.dateEvent} · {match.strTime}
              </span>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold mb-1">{currentLeague.name} Teams</h1>
        <p className="text-xs text-slate-500 mb-4">Showing first 10 teams (free API tier limit)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teams.length === 0 && (
            <p className="text-slate-400 text-sm">No teams found for this league right now.</p>
          )}
          {teams.map((team) => (
            <div
              key={team.idTeam}
              className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <img src={team.strBadge} alt={team.strTeam} className="w-9 h-9 object-contain" />
                <Link href={`/teams/${team.idTeam}?from=teams&league=${currentLeague.id}`} className="font-medium hover:text-emerald-400 transition">
                  {team.strTeam}
                </Link>
              </div>
              <form action={saveFavoriteTeam}>
                <input type="hidden" name="apiTeamId" value={team.idTeam} />
                <input type="hidden" name="teamName" value={team.strTeam} />
                <button
                  type="submit"
                  className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition"
                >
                  Save
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}