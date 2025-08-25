// server.js
import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import db from "./db";

// Get current directory (__dirname equivalent in ESM)
// incase we need it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let server;

// Start server after DB connects
(async () => {
  try {
    await db.connect();

    server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (err) {
    console.error("❌ Could not start server:", err);
    process.exit(1);
  }
})();

// Graceful shutdown handler
async function shutdown(signal) {
  console.log(`👋 Received ${signal}, shutting down gracefully...`);

  if (server) {
    await new Promise((resolve) => server.close(resolve));
    console.log("✅ HTTP server closed");
  }

  await db.close();
  console.log("✅ Database connections closed");

  console.log("✅ Cleanup completed");
  process.exit(0);
}

// Listen for termination signals
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
