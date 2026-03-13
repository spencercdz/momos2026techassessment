import { getDb } from "../database/db.js";

export async function insertUrl({ shortCode, originalUrl }) {
  const db = await getDb();
  const result = await db.run(
    "INSERT INTO urls (short_code, original_url) VALUES (?, ?)",
    shortCode,
    originalUrl
  );
  return result.lastID;
}

export async function getUrlByShortCode(shortCode) {
  const db = await getDb();
  return db.get(
    "SELECT id, short_code, original_url, click_count, created_at FROM urls WHERE short_code = ?",
    shortCode
  );
}

export async function listUrls() {
  const db = await getDb();
  return db.all(
    "SELECT id, short_code, original_url, click_count, created_at FROM urls ORDER BY datetime(created_at) DESC"
  );
}

export async function incrementClickCount(shortCode) {
  const db = await getDb();
  await db.run(
    "UPDATE urls SET click_count = click_count + 1 WHERE short_code = ?",
    shortCode
  );
}

export async function clearUrls() {
  const db = await getDb();
  await db.run("DELETE FROM urls");
}
