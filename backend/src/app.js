import express from "express";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js";
import { redirectToOriginal } from "./controllers/urlController.js";
import { migrate } from "./database/migrate.js";

export async function createApp() {
  await migrate();

  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", urlRoutes);

  app.get("/:shortCode", redirectToOriginal);

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
