import { supabase } from "./src/db/supabase";

async function createPapersTable() {
  try {
    console.log("🔄 Creating 'papers' table in Supabase...\n");

    const sqlQuery = `
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
    `;

    // Using supabase.rpc to execute raw SQL
    const { error } = await supabase.rpc("create_table_sql", {
      sql_query: sqlQuery,
    }).then(null, async () => {
      // Fallback: Try with postgrest directly
      console.log("⚠️  Trying alternative method...");

      // Insert a test record to verify table, if it fails we know table doesn't exist
      const { error: testError } = await supabase
        .from("papers")
        .insert({ title: "Test" });
      if (testError) {
        console.error("Fallback failed:", testError.message);
      }
    });

    if (error) {
      // If RPC fails, provide manual instructions
      console.log("❌ Automated table creation not available.");
      console.log("\n📋 Please create the table manually:");
      console.log("\n1. Open Supabase Dashboard:");
      console.log("   https://aoipnqxruhaxwjeacgsq.supabase.co");
      console.log("\n2. Click 'SQL Editor' in the left sidebar");
      console.log("\n3. Click 'New Query'");
      console.log("\n4. Copy and paste this SQL:\n");
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
      console.log("\n5. Click 'Run' button (or Ctrl+Enter)");
      console.log("\n6. Wait for 'Success' message");
      console.log("\n7. Come back and run: npm run add-data\n");
      process.exit(0);
    }

    console.log("✅ Table created successfully!\n");
    console.log("🚀 Next step: npm run add-data\n");
    
  } catch (error) {
    console.error("❌ Error:", error);
    console.log("\n📋 Manual Setup Instructions:");
    console.log("\n1. Open: https://aoipnqxruhaxwjeacgsq.supabase.co");
    console.log("2. Go to SQL Editor");
    console.log("3. Create table with provided SQL");
    console.log("4. Run: npm run add-data");
    process.exit(0);
  }
}

createPapersTable();
