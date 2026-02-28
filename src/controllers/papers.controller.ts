import { Request, Response } from "express";
import * as PaperService from "../services/papers.service";

// GET ALL
export async function getPapers(req: Request, res: Response) {
  const { data, error } = await PaperService.getAllPapers();
  if (error) return res.status(500).json({ error });
  res.json(data);
}

// CREATE
export async function addPaper(req: Request, res: Response) {
  const { data, error } = await PaperService.createPaper(req.body);
  if (error) return res.status(500).json({ error });
  res.json(data);
}

// DELETE
export async function removePaper(req: Request, res: Response) {
  const { id } = req.params;
  const { error } = await PaperService.deletePaper(id);
  if (error) return res.status(500).json({ error });
  res.json({ message: "Paper deleted" });
}

// UPDATE
export async function editPaper(req: Request, res: Response) {
  const { id } = req.params;
  const { data, error } = await PaperService.updatePaper(id, req.body);
  if (error) return res.status(500).json({ error });
  res.json(data);
}