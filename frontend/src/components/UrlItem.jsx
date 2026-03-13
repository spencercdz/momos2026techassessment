import { useState } from "react";
import { Button } from "./ui/button";

export default function UrlItem({ item }) {
  const [copied, setCopied] = useState(false);

  const createdAt = item.createdAt
    ? new Date(item.createdAt).toLocaleString()
    : "";

  const handleCopy = async () => {
    if (!item.shortUrl) return;
    await navigator.clipboard.writeText(item.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-ink-500/10 bg-white px-4 py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.2em] text-ink-500">
            {createdAt}
          </div>
          <div className="text-sm text-ink-900">{item.originalUrl}</div>
          <a
            href={item.shortUrl}
            className="text-sm font-semibold text-ember-600 underline decoration-ember-500/40 underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            {item.shortUrl}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-ink-500/10 bg-sand-50 px-3 py-1 text-xs text-ink-700">
            {item.clickCount ?? 0} clicks
          </div>
          <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  );
}
