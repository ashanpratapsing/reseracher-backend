import { Router } from "express";
import {
  getPapers,
  addPaper,
  removePaper,
  editPaper,
} from "../controllers/papers.controller";

const router = Router();

router.get("/", getPapers);
router.post("/", addPaper);
router.delete("/:id", removePaper);
router.put("/:id", editPaper);

export default router;