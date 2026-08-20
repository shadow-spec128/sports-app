import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { removeFavoriteTeam } from "@/app/lib/actions";
import { getTeamDetails } from "@/app/lib/sportsApi";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Favorites",
  description: "Your saved favorite teams across all sports.",
};

export default async function FavoritesPage() {
  const session = await auth();
  if (!session) redirect("/");

  const favorites = await prisma.favoriteTeam.findMany({
    where: { userId: session.user.id },
  });

  const favoritesWithBadges = await Promise.all(
    favorites.map(async (fav) => {
      const team = await getTeamDetails(fav.apiTeamId);
      return { ...fav, badge: team?.strBadge || null };
    })
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-emerald-200 px-6 py-10 overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-pink-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-[-120px] w-96 h-96 bg-orange-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-1/4 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-semibold bg-white/60 backdrop-blur border border-white/70 text-slate-700 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/80 hover:-translate-y-0.5"
        >
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-slate-800 mt-6 mb-6">My Favorite Teams</h1>

        {favoritesWithBadges.length === 0 && (
          <p className="text-slate-600">
            You have not saved any teams yet.{" "}
            <Link href="/teams" className="text-orange-500 font-semibold hover:underline">
              Browse teams →
            </Link>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoritesWithBadges.map((fav) => (
            <div
              key={fav.id}
              className="flex items-center justify-between bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-slate-300/30 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                {fav.badge ? (
                  <img src={fav.badge} alt={fav.teamName} className="w-9 h-9 object-contain" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white/60 border border-white/70 flex items-center justify-center text-slate-400 text-sm font-semibold">
                    {fav.teamName.charAt(0)}
                  </div>
                )}
                <Link href={`/teams/${fav.apiTeamId}?from=favorites`} className="font-semibold text-slate-800 hover:text-orange-500 transition">
                  {fav.teamName}
                </Link>
              </div>
              <form action={removeFavoriteTeam}>
                <input type="hidden" name="id" value={fav.id} />
                <button
                  type="submit"
                  className="text-xs bg-white/70 backdrop-blur border border-white/70 text-slate-600 font-semibold px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-red-100/70 hover:text-red-600 hover:-translate-y-0.5"
                >
                  Remove
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}