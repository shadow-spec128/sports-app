import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-emerald-200 flex items-center justify-center px-6">
      <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-slate-300/40 p-10 text-center max-w-sm w-full">
        <p className="text-orange-500 text-sm font-semibold mb-2">404</p>
        <h1 className="text-3xl font-bold text-slate-800 mb-3">Page not found</h1>
        <p className="text-slate-500 mb-6">Looks like this page went out of bounds.</p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-orange-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}