import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "..", "..", "papers.db");
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create papers table if it doesn't exist
export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS papers (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      domain TEXT NOT NULL,
      stage TEXT NOT NULL,
      citations INTEGER NOT NULL DEFAULT 0,
      impact TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ Database initialized successfully");
}

export default db;
