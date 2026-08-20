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
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-emerald-200 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-semibold bg-white/60 backdrop-blur border border-white/70 text-slate-700 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/80 hover:-translate-y-0.5"
        >
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
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg shadow-orange-300/40"
                          : "bg-white/60 backdrop-blur border border-white/70 text-slate-700 hover:bg-white/80 hover:-translate-y-0.5"
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

        <h1 className="text-2xl font-bold text-slate-800 mb-1">Upcoming {currentLeague.name} Matches</h1>
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-slate-300/30 p-4 mb-10 mt-3">
          {matches.length === 0 && (
            <p className="text-slate-500 text-sm">No upcoming matches found right now.</p>
          )}
          {matches.map((match) => (
            <div key={match.idEvent} className="text-slate-800">
              <span className="font-semibold">{match.strHomeTeam}</span>
              <span className="text-slate-400 mx-2">vs</span>
              <span className="font-semibold">{match.strAwayTeam}</span>
              <span className="text-slate-500 ml-3 text-sm">
                {match.dateEvent} · {match.strTime}
              </span>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-1">{currentLeague.name} Teams</h1>
        <p className="text-xs text-slate-500 mb-4">Showing first 10 teams (free API tier limit)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teams.length === 0 && (
            <p className="text-slate-500 text-sm">No teams found for this league right now.</p>
          )}
          {teams.map((team) => (
            <div
              key={team.idTeam}
              className="flex items-center justify-between bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-slate-300/30 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <img src={team.strBadge} alt={team.strTeam} className="w-9 h-9 object-contain" />
                <Link href={`/teams/${team.idTeam}?from=teams&league=${currentLeague.id}`} className="font-semibold text-slate-800 hover:text-orange-500 transition">
                  {team.strTeam}
                </Link>
              </div>
              <form action={saveFavoriteTeam}>
                <input type="hidden" name="apiTeamId" value={team.idTeam} />
                <input type="hidden" name="teamName" value={team.strTeam} />
                <button
                  type="submit"
                  className="text-xs bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-md shadow-orange-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
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