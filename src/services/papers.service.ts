import { supabase } from "../db/supabase";
import type { Paper } from "../types/paper";

// GET ALL
export async function getAllPapers() {
  return await supabase
    .from("papers")
    .select("*")
    .order("created_at", { ascending: false });
}

// CREATE
export async function createPaper(data: Paper) {
  return await supabase.from("papers").insert([data]);
}

// DELETE
export async function deletePaper(id: string) {
  return await supabase.from("papers").delete().eq("id", id);
}

// UPDATE
export async function updatePaper(id: string, data: Partial<Paper>) {
  return await supabase.from("papers").update(data).eq("id", id);
}
