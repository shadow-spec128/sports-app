import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-emerald-400 text-sm font-medium mb-2">404</p>
        <h1 className="text-3xl font-bold mb-3">Page not found</h1>
        <p className="text-slate-400 mb-6">Looks like this page went out of bounds.</p>
        <Link
          href="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}