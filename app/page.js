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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-cyan-100 to-emerald-200 px-6">
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-slate-300/40 p-10 text-center max-w-sm w-full">
                   <img
            src={session.user.image}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-white/70"
          />
          <h2 className="text-xl font-semibold text-slate-800">Welcome, {session.user.name}!</h2>
          <p className="text-slate-500 text-sm mt-1">{session.user.email}</p>

          <Link
            href="/teams"
            className="mt-6 inline-block w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-orange-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-300/50"
          >
            Choose Your Sport →
          </Link>

          <Link
            href="/favorites"
            className="mt-3 inline-block w-full bg-white/60 backdrop-blur border border-white/70 text-slate-800 font-semibold py-3 rounded-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-0.5"
          >
            My Favorites ★
          </Link>

          <Link
            href="/news"
            className="mt-3 inline-block w-full bg-white/60 backdrop-blur border border-white/70 text-slate-800 font-semibold py-3 rounded-2xl transition-all duration-300 hover:bg-white/80 hover:-translate-y-0.5"
          >
            Football News 📰
          </Link>

          <form action={handleSignOut} className="mt-4">
            <button
              type="submit"
              className="w-full text-slate-500 hover:text-slate-800 text-sm py-2 transition"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-cyan-100 to-emerald-200 px-6">
      <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-slate-300/40 p-10 text-center max-w-sm w-full">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">⚽ Sports App</h1>
        <p className="text-slate-500 mb-8">Track your favorite teams across 5 sports.</p>
        <form action={handleSignIn}>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold py-3 rounded-2xl shadow-lg shadow-orange-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-300/50"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}