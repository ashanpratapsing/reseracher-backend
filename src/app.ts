import express from "express";
import cors from "cors";
import paperRoutes from "./routes/papers.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/papers", paperRoutes);

app.get("/", (_, res) => {
  res.send("PaperTrail Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

