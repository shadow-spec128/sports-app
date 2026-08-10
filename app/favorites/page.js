import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { removeFavoriteTeam } from "@/app/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111827] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold bg-white text-[#111827] px-3 py-1.5 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#111827]">
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-bold mt-6 mb-6">My Favorite Teams</h1>

        {favorites.length === 0 && (
          <p className="text-slate-500">
            You have not saved any teams yet.{" "}
            <Link href="/teams" className="text-[#FF5A36] font-semibold hover:underline">
              Browse teams →
            </Link>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="flex items-center justify-between bg-white border-2 border-[#111827] rounded-xl shadow-[3px_3px_0px_0px_#111827] p-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#111827]"
            >
              <Link href={`/teams/${fav.apiTeamId}?from=favorites`} className="font-semibold hover:text-[#FF5A36] transition">
                {fav.teamName}
              </Link>
              <form action={removeFavoriteTeam}>
                <input type="hidden" name="id" value={fav.id} />
                <button
                  type="submit"
                  className="text-xs bg-white text-[#111827] font-semibold px-3 py-1.5 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111827] hover:bg-red-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#111827]"
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