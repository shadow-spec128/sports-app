import { XMLParser } from "fast-xml-parser";

export async function getFootballNews() {
  const res = await fetch(
    "https://news.google.com/rss/search?q=football+transfer+news&hl=en-US&gl=US&ceid=US:en",
    { cache: "no-store" }
  );
  const xml = await res.text();

  const parser = new XMLParser();
  const data = parser.parse(xml);

  const rawItems = data?.rss?.channel?.item;
  const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];
  return items.slice(0, 10).map((item) => ({
    title: item.title,
    link: item.link,
    source: item.source?.["#text"] || "Google News",
    pubDate: item.pubDate,
  }));
}