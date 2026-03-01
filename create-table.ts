import { supabase } from "./src/db/supabase";

async function createTable() {
  try {
    console.log("🔄 Creating 'papers' table in Supabase...\n");

    const { data, error } = await supabase.rpc("create_papers_table", {}, {
      head: true,
    });

    if (error) {
      console.log("⚠️  RPC method not available. Please create table manually:\n");
      console.log("1. Go to your Supabase SQL Editor");
      console.log("2. Copy and paste this SQL:");
      console.log(`
      
CREATE TABLE IF NOT EXISTS papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  domain TEXT NOT NULL,
  stage TEXT NOT NULL,
  citations INTEGER NOT NULL DEFAULT 0,
  impact TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

      `);
      console.log("3. Click 'Run' button");
      console.log("4. Come back and run: npm run add-data");
      process.exit(1);
    }

    console.log("✅ Table created successfully!");
    console.log("\n🚀 Now run: npm run add-data");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createTable();
