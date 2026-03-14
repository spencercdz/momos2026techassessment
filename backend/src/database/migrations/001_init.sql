CREATE TABLE IF NOT EXISTS urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_code TEXT NOT NULL UNIQUE,
  original_url TEXT NOT NULL,
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);

-- Speed up queries that order by created_at (e.g. dashboard recent links)
CREATE INDEX IF NOT EXISTS idx_urls_created_at ON urls(created_at DESC);
