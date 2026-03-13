import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { shortenUrl } from "../services/api";

export default function UrlForm({ onCreated }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setCopied(false);

    if (!url.trim()) {
      setError("Please enter a URL to shorten.");
      return;
    }

    try {
      setLoading(true);
      const data = await shortenUrl(url.trim());
      setResult(data);
      setUrl("");
      onCreated?.();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.shortUrl) return;
    await navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
        <Input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Paste a long URL (https://...)"
          type="url"
          required
        />
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </Button>
      </form>

      {error ? (
        <div className="rounded-xl border border-ember-500/40 bg-ember-500/10 px-4 py-3 text-sm text-ink-900">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="flex flex-col gap-2 rounded-xl border border-ink-500/10 bg-white px-4 py-4 text-sm">
          <div className="text-ink-700">Short URL</div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <a
              href={result.shortUrl}
              className="font-semibold text-ink-900 underline decoration-ember-500/40 underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              {result.shortUrl}
            </a>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
