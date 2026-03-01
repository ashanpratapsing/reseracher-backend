# PaperTrail Backend

A TypeScript/Express backend server for managing research papers with Supabase as the database.

## 📦 What's Been Fixed

All errors have been resolved! See [FIXES_SUMMARY.md](FIXES_SUMMARY.md) for detailed information.

## 🚀 Quick Start

### 1. **Setup Environment Variables**

Copy your Supabase credentials into the `.env` file:

```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
```

### 2. **Create Database Table (First Time Only)**

In Supabase SQL Editor, run:

```sql
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
```

### 3. **Start the Server**

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📡 API Usage Examples

### Get All Papers
```bash
curl http://localhost:5000/api/papers
```

### Add a New Paper
```bash
curl -X POST http://localhost:5000/api/papers \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Research",
    "author": "John Doe",
    "domain": "AI",
    "stage": "Published",
    "citations": 5,
    "impact": "High",
    "date": "2026-03-01"
  }'
```

### Update a Paper
```bash
curl -X PUT http://localhost:5000/api/papers/PAPER_ID \
  -H "Content-Type: application/json" \
  -d '{"citations": 10}'
```

### Delete a Paper
```bash
curl -X DELETE http://localhost:5000/api/papers/PAPER_ID
```

## 📁 Project Structure

```
src/
├── app.ts                 # Main Express app
├── controllers/          
│   └── papers.controller.ts
├── services/
│   └── papers.service.ts
├── routes/
│   └── papers.route.ts
├── types/
│   └── paper.ts
└── db/
    └── supabase.ts
```

## 🔧 Available Commands

- `npm run dev` - Start dev server with hot-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm test` - Run tests (not configured yet)

## 📋 Features

✅ Full CRUD operations for papers
✅ Supabase integration  
✅ TypeScript with strict mode
✅ CORS enabled
✅ Error handling
✅ Environment configuration

## 🐛 Troubleshooting

**Issue: "Invalid supabaseUrl"**
- Make sure `.env` file has correct Supabase credentials

**Issue: Table doesn't exist**
- Run the SQL table creation command in Supabase dashboard

**Issue: Ports in use**
- Change `PORT` in `.env` file or kill process using port 5000

## 📚 Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **ORM**: Supabase JS Client

---

**Status**: ✅ Ready to use (awaiting Supabase credentials)
