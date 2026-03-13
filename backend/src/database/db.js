import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_DB_PATH = path.join(__dirname, "..", "..", "data", "url_shortener.db");

let db;
let currentDbFile;

function resolveDbFile() {
  return process.env.DB_FILE || DEFAULT_DB_PATH;
}

export async function getDb() {
  const targetDbFile = resolveDbFile();

  if (!db || currentDbFile !== targetDbFile) {
    if (db) {
      await db.close();
    }

    if (targetDbFile !== ":memory:") {
      await fs.mkdir(path.dirname(targetDbFile), { recursive: true });
    }

    db = await open({ filename: targetDbFile, driver: sqlite3.Database });
    currentDbFile = targetDbFile;
  }

  return db;
}

export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
    currentDbFile = null;
  }
}

export function getDbFile() {
  return resolveDbFile();
}
