import { getFootballNews } from "@/app/lib/newsapi";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Football News",
  description: "Latest football news and transfer headlines.",
};

export default async function NewsPage() {
  const news = await getFootballNews();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111827] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold bg-white text-[#111827] px-3 py-1.5 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0px_0px_#111827] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#111827]">
          ← Back to Home
        </Link>

        <h1 className="text-2xl font-bold mt-6 mb-1">Football News</h1>
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
              className="block bg-white border-2 border-[#111827] rounded-xl shadow-[3px_3px_0px_0px_#111827] p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#111827]"
            >
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs text-slate-500 mt-1">{item.source}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}