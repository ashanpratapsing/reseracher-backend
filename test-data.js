"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite_1 = require("./src/db/sqlite");
const uuid_1 = require("uuid");
const samplePapers = [
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
function addTestData() {
    try {
        console.log("🔄 Initializing database...");
        (0, sqlite_1.initializeDatabase)();
        // Clear existing papers
        const deleteStmt = sqlite_1.db.prepare("DELETE FROM papers");
        deleteStmt.run();
        console.log("🗑️  Cleared existing papers");
        console.log("📥 Adding sample papers...");
        const stmt = sqlite_1.db.prepare("INSERT INTO papers (id, title, author, domain, stage, citations, impact, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        samplePapers.forEach((paper) => {
            const id = (0, uuid_1.v4)();
            stmt.run(id, paper.title, paper.author, paper.domain, paper.stage, paper.citations, paper.impact, paper.date);
        });
        console.log(`✅ Successfully added ${samplePapers.length} papers!`);
        console.log("\n📚 Papers added:");
        samplePapers.forEach((paper, index) => {
            console.log(`${index + 1}. "${paper.title}" by ${paper.author}`);
        });
        // Display all papers
        const selectStmt = sqlite_1.db.prepare("SELECT * FROM papers");
        const allPapers = selectStmt.all();
        console.log(`\n✅ Total papers in database: ${allPapers.length}`);
        console.log("\n🎉 Test data added successfully!");
        console.log("\n🚀 You can now:");
        console.log("   - Run 'npm run dev' to start the server");
        console.log("   - Test endpoints with curl or Postman");
    }
    catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}
addTestData();
