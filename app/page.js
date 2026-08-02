import Link from "next/link";
import { signIn, signOut, auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  async function handleSignIn() {
    "use server";
    await signIn("google");
  }

  async function handleSignOut() {
    "use server";
    await signOut();
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900 rounded-2xl shadow-xl p-10 text-center max-w-sm w-full border border-slate-800">
          <img
            src={session.user.image}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-emerald-500"
          />
          <h2 className="text-xl font-semibold text-white">Welcome, {session.user.name}!</h2>
          <p className="text-slate-400 text-sm mt-1">{session.user.email}</p>

          <Link
            href="/teams"
            className="mt-6 inline-block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg transition"
          >
            View Premier League Teams →
          </Link>
          <Link
            href="/favorites"
            className="mt-3 inline-block w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-lg transition"
>
           My Favorites ★
          </Link>

          <form action={handleSignOut} className="mt-3">
            <button
              type="submit"
              className="w-full text-slate-400 hover:text-white text-sm py-2 transition"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center max-w-sm w-full px-6">
        <h1 className="text-3xl font-bold text-white mb-2">⚽ Sports App</h1>
        <p className="text-slate-400 mb-8">Track your favorite Premier League teams and matches.</p>
        <form action={handleSignIn}>
          <button
            type="submit"
            className="w-full bg-white text-slate-900 font-medium py-2.5 rounded-lg hover:bg-slate-100 transition"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}