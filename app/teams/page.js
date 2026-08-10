import { getTeamsByLeague, getUpcomingMatches, LEAGUES } from "@/app/lib/sportsApi";
import { saveFavoriteTeam } from "@/app/lib/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Browse Teams",
  description: "Browse teams by sport and league, and save your favorites.",
};

export default async function TeamsPage({ searchParams }) {
  const params = await searchParams;
  const leagueId = params.league || "4328";
  const currentLeague = LEAGUES.find((l) => l.id === leagueId) || LEAGUES[0];

  const teams = await getTeamsByLeague(currentLeague.query);
  const matches = await getUpcomingMatches(currentLeague.id);

  const sports = [...new Set(LEAGUES.map((l) => l.sport))];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111827] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold bg-white text-[#111827] px-3 py-1.5 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#111827]">
          ← Back to Home
        </Link>

        <div className="mt-6 mb-10 space-y-5">
          {sports.map((sport) => (
            <div key={sport}>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">{sport}</p>
              <div className="flex gap-3 flex-wrap">
                {LEAGUES.filter((l) => l.sport === sport).map((league) => {
                  const active = league.id === leagueId;
                  return (
                    <a
                      key={league.id}
                      href={`/teams?league=${league.id}`}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 border-[#111827] transition-all duration-150 ${
                        active
                          ? "bg-[#111827] text-white shadow-[3px_3px_0px_0px_#FF5A36]"
                          : "bg-white text-[#111827] shadow-[3px_3px_0px_0px_#111827] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#111827]"
                      }`}
                    >
                      {league.name}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold mb-1">Upcoming {currentLeague.name} Matches</h1>
        <div className="bg-white border-2 border-[#111827] rounded-xl shadow-[4px_4px_0px_0px_#111827] p-4 mb-10 mt-3">
          {matches.length === 0 && (
            <p className="text-slate-500 text-sm">No upcoming matches found right now.</p>
          )}
          {matches.map((match) => (
            <div key={match.idEvent} className="text-[#111827]">
              <span className="font-semibold">{match.strHomeTeam}</span>
              <span className="text-slate-400 mx-2">vs</span>
              <span className="font-semibold">{match.strAwayTeam}</span>
              <span className="text-slate-500 ml-3 text-sm">
                {match.dateEvent} · {match.strTime}
              </span>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold mb-1">{currentLeague.name} Teams</h1>
        <p className="text-xs text-slate-500 mb-4">Showing first 10 teams (free API tier limit)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teams.length === 0 && (
            <p className="text-slate-500 text-sm">No teams found for this league right now.</p>
          )}
          {teams.map((team) => (
            <div
              key={team.idTeam}
              className="flex items-center justify-between bg-white border-2 border-[#111827] rounded-xl shadow-[3px_3px_0px_0px_#111827] p-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#111827]"
            >
              <div className="flex items-center gap-3">
                <img src={team.strBadge} alt={team.strTeam} className="w-9 h-9 object-contain" />
                <Link href={`/teams/${team.idTeam}?from=teams&league=${currentLeague.id}`} className="font-semibold hover:text-[#FF5A36] transition">
                  {team.strTeam}
                </Link>
              </div>
              <form action={saveFavoriteTeam}>
                <input type="hidden" name="apiTeamId" value={team.idTeam} />
                <input type="hidden" name="teamName" value={team.strTeam} />
                <button
                  type="submit"
                  className="text-xs bg-[#FF5A36] text-white font-semibold px-3 py-1.5 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#111827]"
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