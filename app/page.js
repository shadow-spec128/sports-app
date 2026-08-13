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
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="bg-white rounded-2xl p-10 text-center max-w-sm w-full border-2 border-[#111827] shadow-[6px_6px_0px_0px_#111827]">
          <img
            src={session.user.image}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#111827]"
          />
          <h2 className="text-xl font-semibold text-[#111827]">Welcome, {session.user.name}!</h2>
          <p className="text-slate-500 text-sm mt-1">{session.user.email}</p>

          <Link
            href="/teams"
            className="mt-6 inline-block w-full bg-[#FF5A36] text-white font-semibold py-2.5 rounded-xl border-2 border-[#111827] shadow-[4px_4px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#111827] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_0px_#111827]"
          >
            Choose Your Sport →
          </Link>

          <Link
            href="/favorites"
            className="mt-3 inline-block w-full bg-white text-[#111827] font-semibold py-2.5 rounded-xl border-2 border-[#111827] shadow-[4px_4px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#111827] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_0px_#111827]"
          >
            My Favorites ★
          </Link>
           <Link
            href="/news"
            className="mt-3 inline-block w-full bg-white text-[#111827] font-semibold py-2.5 rounded-xl border-2 border-[#111827] shadow-[4px_4px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#111827] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_0px_#111827]"
          >
            Football News 📰
          </Link>
          <form action={handleSignOut} className="mt-4">
            <button
              type="submit"
              className="w-full bg-white text-[#111827] text-sm font-semibold py-2 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111827] hover:bg-red-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#111827]"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
      <div className="text-center max-w-sm w-full px-6">
        <h1 className="text-4xl font-bold text-[#111827] mb-2">⚽ Sports App</h1>
        <p className="text-slate-500 mb-8">Track your favorite teams across 5 sports.</p>
        <form action={handleSignIn}>
          <button
            type="submit"
            className="w-full bg-[#111827] text-white font-semibold py-3 rounded-xl border-2 border-[#111827] shadow-[4px_4px_0px_0px_#FF5A36] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#FF5A36] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_0px_#FF5A36]"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}