import { getTeamDetails, getTeamNextMatch, getTeamLastMatch, getTeamPlayers, LEAGUES } from "@/app/lib/sportsApi";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const team = await getTeamDetails(id);
  return {
    title: team ? team.strTeam : "Team",
    description: team ? `Stadium, squad, and upcoming matches for ${team.strTeam}.` : "Team details",
  };
}

export default async function TeamDetailPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const from = sp.from;
  const leagueId = sp.league;

  const league = LEAGUES.find((l) => l.id === leagueId);
  const backHref = from === "favorites" ? "/favorites" : `/teams${leagueId ? `?league=${leagueId}` : ""}`;
  const backLabel = from === "favorites" ? "← Back to Favorites" : `← Back to ${league ? league.name : "Teams"}`;

  const team = await getTeamDetails(id);
  const nextMatch = await getTeamNextMatch(id);
  const lastMatch = await getTeamLastMatch(id);
  const players = await getTeamPlayers(id);

  if (!team) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#111827] px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <Link href={backHref} className="inline-flex items-center gap-1 text-sm font-semibold bg-white text-[#111827] px-3 py-1.5 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#111827]">
            {backLabel}
          </Link>
          <p className="text-slate-500 mt-6">Team details could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111827] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <Link href={backHref} className="inline-flex items-center gap-1 text-sm font-semibold bg-white text-[#111827] px-3 py-1.5 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#111827]">
          {backLabel}
        </Link>

        <div className="flex items-center gap-4 mt-6 mb-8">
          <img src={team.strBadge} alt={team.strTeam} className="w-16 h-16 object-contain" />
          <h1 className="text-3xl font-bold">{team.strTeam}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-[#111827] rounded-xl shadow-[4px_4px_0px_0px_#111827] p-5">
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <div className="space-y-2 text-sm text-slate-600">
              {team.strStadium && <p><span className="text-slate-400">Stadium:</span> {team.strStadium}</p>}
              {team.strStadiumLocation && <p><span className="text-slate-400">Location:</span> {team.strStadiumLocation}</p>}
              {team.strCountry && <p><span className="text-slate-400">Country:</span> {team.strCountry}</p>}
              {team.intFormedYear && <p><span className="text-slate-400">Founded:</span> {team.intFormedYear}</p>}
            </div>

            {team.strDescriptionEN && (
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {team.strDescriptionEN.slice(0, 600)}
                {team.strDescriptionEN.length > 600 && "…"}
              </p>
            )}
          </div>

          <div className="bg-white border-2 border-[#111827] rounded-xl shadow-[4px_4px_0px_0px_#111827] p-5">
            <h2 className="text-lg font-semibold mb-3">Next Match</h2>
            {nextMatch ? (
              <p className="text-sm text-slate-700">
                {nextMatch.strHomeTeam} vs {nextMatch.strAwayTeam}
                <span className="block text-slate-400 mt-1">{nextMatch.dateEvent} · {nextMatch.strTime}</span>
              </p>
            ) : (
              <p className="text-sm text-slate-500">No upcoming match found.</p>
            )}

            <h2 className="text-lg font-semibold mt-6 mb-3">Last Match</h2>
            {lastMatch ? (
              <p className="text-sm text-slate-700">
                {lastMatch.strHomeTeam} {lastMatch.intHomeScore ?? "-"} : {lastMatch.intAwayScore ?? "-"} {lastMatch.strAwayTeam}
                <span className="block text-slate-400 mt-1">{lastMatch.dateEvent}</span>
              </p>
            ) : (
              <p className="text-sm text-slate-500">No recent match found.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-1">Squad</h2>
          <p className="text-xs text-slate-500 mb-4">Roster data is community-sourced and may not include very recent transfers.</p>
          {players.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {players.map((p) => {
                const photo = p.strCutout || p.strThumb || p.strRender;
                return (
                  <div key={p.idPlayer} className="flex flex-col items-center text-center">
                    {photo ? (
                      <img
                        src={photo}
                        alt={p.strPlayer}
                        className="w-20 h-20 rounded-full object-cover bg-white border-2 border-[#111827]"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-[#111827] flex items-center justify-center text-slate-400 text-lg font-semibold">
                        {p.strPlayer?.charAt(0)}
                      </div>
                    )}
                    <p className="text-xs font-semibold mt-2">{p.strPlayer}</p>
                    <p className="text-xs text-slate-500">{p.strPosition}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Squad information is not available for this team on the free plan.</p>
          )}
        </div>
      </div>
    </div>
  );
}