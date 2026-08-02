import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { removeFavoriteTeam } from "@/app/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
  const session = await auth();
  if (!session) redirect("/");

  const favorites = await prisma.favoriteTeam.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 text-sm">
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-bold mt-6 mb-6">My Favorite Teams</h1>

        {favorites.length === 0 && (
          <p className="text-slate-400">
            You have not saved any teams yet.{" "}
            <Link href="/teams" className="text-emerald-400 hover:text-emerald-300">
              Browse teams →
            </Link>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-3"
            >
              <span className="font-medium">{fav.teamName}</span>
              <form action={removeFavoriteTeam}>
                <input type="hidden" name="id" value={fav.id} />
                <button
                  type="submit"
                  className="text-xs bg-red-600/80 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition"
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