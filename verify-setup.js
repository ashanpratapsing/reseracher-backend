"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
console.log("🔍 Verifying Backend Setup...\n");
const checks = [
    {
        name: "✅ package.json exists",
        check: () => fs.existsSync("package.json"),
    },
    {
        name: "✅ .env file exists",
        check: () => fs.existsSync(".env"),
    },
    {
        name: "✅ src/app.ts exists",
        check: () => fs.existsSync("src/app.ts"),
    },
    {
        name: "✅ src/db/supabase.ts exists",
        check: () => fs.existsSync("src/db/supabase.ts"),
    },
    {
        name: "✅ All route files exist",
        check: () => fs.existsSync("src/routes/papers.route.ts") &&
            fs.existsSync("src/controllers/papers.controller.ts") &&
            fs.existsSync("src/services/papers.service.ts"),
    },
    {
        name: "✅ node_modules installed",
        check: () => fs.existsSync("node_modules"),
    },
];
let passed = 0;
let failed = 0;
checks.forEach((check) => {
    if (check.check()) {
        console.log(check.name);
        passed++;
    }
    else {
        console.log(`❌ ${check.name.replace("✅", "")}`);
        failed++;
    }
});
console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
// Check .env file contents
console.log("\n🔐 Environment Variables Check:");
if (fs.existsSync(".env")) {
    const envContent = fs.readFileSync(".env", "utf-8");
    const hasValidUrl = envContent.includes("https://") && !envContent.includes("your_supabase_url");
    const hasValidKey = envContent.includes("SUPABASE_SERVICE_KEY=") &&
        !envContent.includes("your_supabase_service_key");
    console.log(`${hasValidUrl ? "✅" : "❌"} SUPABASE_URL: ${hasValidUrl ? "Valid URL" : "Needs valid HTTPS URL"}`);
    console.log(`${hasValidKey ? "✅" : "❌"} SUPABASE_SERVICE_KEY: ${hasValidKey ? "Present" : "Missing/Placeholder"}`);
    if (!hasValidUrl || !hasValidKey) {
        console.log("\n⚠️  Action Required:");
        console.log('   1. Go to https://supabase.com and create a project (if you don\'t have one)');
        console.log('   2. Go to Settings → API in your Supabase project dashboard');
        console.log('   3. Copy "Project URL" → Update SUPABASE_URL in .env');
        console.log('   4. Copy "Service Role Secret" → Update SUPABASE_SERVICE_KEY in .env');
        console.log("\n   5. Run: npm run add-data (to add sample papers)");
        console.log('   6. Run: npm run dev (to start the server)');
    }
}
else {
    console.log("❌ .env file not found");
}
console.log("\n📚 Next Steps:");
console.log("1. Update .env with real Supabase credentials");
console.log("2. Create the 'papers' table in Supabase (SQL provided in README)");
console.log("3. Run: npm run add-data");
console.log("4. Run: npm run dev");
