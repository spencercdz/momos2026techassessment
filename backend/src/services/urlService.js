import {
  insertUrl,
  getUrlByShortCode,
  listUrls,
  incrementClickCount
} from "../models/urlModel.js";
import { generateShortCode } from "../utils/shortCode.js";
import { getBaseUrl } from "../config.js";

const MAX_ATTEMPTS = 5;

function isUniqueConstraintError(error) {
  return (
    error &&
    error.code === "SQLITE_CONSTRAINT" &&
    typeof error.message === "string" &&
    error.message.includes("UNIQUE")
  );
}

function buildShortUrl(shortCode) {
  const baseUrl = getBaseUrl();
  return `${baseUrl.replace(/\/$/, "")}/${shortCode}`;
}

export async function createShortUrl(originalUrl) {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const shortCode = generateShortCode();

    try {
      await insertUrl({ shortCode, originalUrl });
      return { shortCode, shortUrl: buildShortUrl(shortCode) };
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        continue;
      }
      throw error;
    }
  }

  throw new Error("Failed to generate a unique short code. Please retry.");
}

export async function getUrls() {
  const rows = await listUrls();
  return rows.map((row) => ({
    id: row.id,
    shortCode: row.short_code,
    originalUrl: row.original_url,
    clickCount: row.click_count,
    createdAt: row.created_at ? new Date(`${row.created_at}Z`).toISOString() : null,
    shortUrl: buildShortUrl(row.short_code)
  }));
}

export async function findUrlByCode(shortCode) {
  return getUrlByShortCode(shortCode);
}

export async function recordClick(shortCode) {
  await incrementClickCount(shortCode);
}
