import UrlItem from "./UrlItem";

export default function UrlList({ items, loading }) {
  if (loading) {
    return (
      <div className="rounded-xl border border-dashed border-ink-500/20 bg-white px-4 py-6 text-sm text-ink-500">
        Loading recent links...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-ink-500/20 bg-white px-4 py-6 text-sm text-ink-500">
        No links yet. Shorten your first URL above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <UrlItem key={item.id} item={item} />
      ))}
    </div>
  );
}
