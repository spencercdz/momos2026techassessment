import { useEffect, useMemo, useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { fetchUrls } from "../services/api";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUrls = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchUrls();
      setItems(data.urls || []);
    } catch (err) {
      setError(err.message || "Failed to load URLs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const stats = useMemo(() => {
    const totalLinks = items.length;
    const totalClicks = items.reduce(
      (sum, item) => sum + (item.clickCount || 0),
      0
    );
    return { totalLinks, totalClicks };
  }, [items]);

  return (
    <div className="shell min-h-screen">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="space-y-4 fade-in">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.4em] text-ink-500">
              Emberlink
            </span>
            <h1 className="text-4xl font-semibold text-ink-900 md:text-5xl">
              Shorten links with signal, not noise.
            </h1>
          </div>
          <p className="max-w-2xl text-base text-ink-700">
            Create memorable five-character links, track engagement, and keep a
            clean dashboard of every shortened URL.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <Card className="stagger-in" style={{ animationDelay: "0.05s" }}>
            <CardHeader>
              <CardTitle>Total Links</CardTitle>
              <div className="text-3xl font-semibold text-ink-900">
                {stats.totalLinks}
              </div>
            </CardHeader>
          </Card>
          <Card className="stagger-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
              <div className="text-3xl font-semibold text-ink-900">
                {stats.totalClicks}
              </div>
            </CardHeader>
          </Card>
          <Card className="stagger-in" style={{ animationDelay: "0.15s" }}>
            <CardHeader>
              <CardTitle>Fresh Links</CardTitle>
              <div className="text-sm text-ink-700">
                Latest URLs show up instantly as you shorten them.
              </div>
            </CardHeader>
          </Card>
        </section>

        <Card className="stagger-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle>Shorten a URL</CardTitle>
          </CardHeader>
          <CardContent>
            <UrlForm onCreated={loadUrls} />
          </CardContent>
        </Card>

        <section className="space-y-4 stagger-in" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink-900">
              Recent Short Links
            </h2>
            <span className="text-xs uppercase tracking-[0.3em] text-ink-500">
              {items.length} total
            </span>
          </div>
          {error ? (
            <div className="rounded-xl border border-ember-500/40 bg-ember-500/10 px-4 py-3 text-sm text-ink-900">
              {error}
            </div>
          ) : null}
          <UrlList items={items} loading={loading} />
        </section>
      </div>
    </div>
  );
}
