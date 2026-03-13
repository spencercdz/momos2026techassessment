import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { getDb } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, "migrations");

export async function migrate() {
  const db = await getDb();
  const files = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = await fs.readFile(path.join(migrationsDir, file), "utf-8");
    await db.exec(sql);
  }
}

if (process.argv[1] === __filename) {
  migrate()
    .then(() => {
      console.log("Migrations completed.");
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}
