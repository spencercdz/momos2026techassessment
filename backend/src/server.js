import { createApp } from "./app.js";
import { getPort } from "./config.js";
import { getDbFile } from "./database/db.js";

createApp()
  .then((app) => {
    const port = getPort();
    app.listen(port, () => {
      console.log(`Backend running on port ${port}`);
      console.log(`SQLite DB: ${getDbFile()}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
