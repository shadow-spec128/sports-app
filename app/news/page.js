import { getFootballNews } from "@/app/lib/newsApi";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Football News",
  description: "Latest football news and transfer headlines.",
};

export default async function NewsPage() {
  const news = await getFootballNews();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-emerald-200 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-semibold bg-white/60 backdrop-blur border border-white/70 text-slate-700 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/80 hover:-translate-y-0.5"
        >
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-slate-800 mt-6 mb-1">Football News</h1>
        <p className="text-xs text-slate-500 mb-6">Live headlines from Google News — includes transfer rumors and match results.</p>

        <div className="space-y-3">
          {news.length === 0 && (
            <p className="text-slate-500 text-sm">No news found right now.</p>
          )}
          {news.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-slate-300/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <p className="font-semibold text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-500 mt-1">{item.source}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}