import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

type Tool = { id: string; name: string; description?: string; available: boolean; ownerId?: number };

const toolsDb: Tool[] = [];

export function listTools(req: Request, res: Response) {
  return res.json(toolsDb);
}

export function createTool(req: Request, res: Response) {
  const { name, description, available } = req.body;
  if (!name) return res.status(400).json({ error: "El nombre es requerido" });

  const newTool: Tool = { id: uuidv4(), name, description: description || "", available: available ?? true, ownerId: req.user?.sub };
  toolsDb.push(newTool);
  return res.status(201).json(newTool);
}

export function loanTool(req: Request, res: Response) {
  const { id } = req.params;
  const tool = toolsDb.find((t) => t.id === id);
  if (!tool) return res.status(404).json({ error: "Herramienta no encontrada" });

  if (!tool.available) return res.status(400).json({ error: "Herramienta no disponible" });

  tool.available = false;
  return res.json(tool);
}
