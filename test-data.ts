import { supabase } from "./src/db/supabase";
import type { Paper } from "./src/types/paper";

const samplePapers: Paper[] = [
  {
    title: "Deep Learning in Natural Language Processing",
    author: "Alice Johnson",
    domain: "AI",
    stage: "Published",
    citations: 45,
    impact: "High",
    date: "2024-01-15",
  },
  {
    title: "Quantum Computing Applications",
    author: "Bob Smith",
    domain: "Quantum",
    stage: "In Review",
    citations: 12,
    impact: "Medium",
    date: "2025-06-20",
  },
  {
    title: "Renewable Energy Optimization",
    author: "Carol Davis",
    domain: "Energy",
    stage: "Published",
    citations: 28,
    impact: "High",
    date: "2023-09-10",
  },
  {
    title: "Blockchain in Healthcare",
    author: "David Evans",
    domain: "Blockchain",
    stage: "Draft",
    citations: 5,
    impact: "Low",
    date: "2026-02-28",
  },
  {
    title: "Machine Learning for Climate Prediction",
    author: "Emma Wilson",
    domain: "AI",
    stage: "Published",
    citations: 67,
    impact: "Very High",
    date: "2024-11-05",
  },
];

async function addTestData() {
  try {
    console.log("🔄 Connecting to Supabase...");
    
    // Test connection and get current count
    const { data: countData, error: countError } = await supabase
      .from("papers")
      .select("*", { count: "exact" });

    if (countError) {
      console.error("❌ Connection failed:", countError.message);
      console.log("\n📋 Checklist:");
      console.log("1. Make sure SUPABASE_URL is correct");
      console.log("2. Make sure SUPABASE_SERVICE_KEY is correct");
      console.log("3. Make sure the 'papers' table exists in Supabase");
      console.log("\n💡 To create the table, run this in Supabase SQL Editor:");
      console.log(`
CREATE TABLE papers (
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
      process.exit(1);
    }

    console.log("✅ Connected to Supabase successfully!");
    console.log(`📊 Current papers in database: ${countData?.length || 0}`);
    
    console.log("\n📥 Adding sample papers...");
    
    const { data, error } = await supabase
      .from("papers")
      .insert(samplePapers)
      .select();

    if (error) {
      console.error("❌ Failed to add papers:", error.message);
      process.exit(1);
    }

    console.log(`✅ Successfully added ${data?.length || 0} papers!`);
    console.log("\n📚 Papers added:");
    data?.forEach((paper, index) => {
      console.log(`${index + 1}. "${paper.title}" by ${paper.author}`);
    });

    console.log("\n🎉 Test data added successfully!");
    console.log("\n🚀 You can now:");
    console.log("   - Run 'npm run dev' to start the server");
    console.log("   - Test endpoints with curl or Postman");
    
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

addTestData();
