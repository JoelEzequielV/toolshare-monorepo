import { useEffect, useState } from "react";
import { Tool } from "../types/Tool";
import { FetchToolsUseCase } from "../usecases/fetchToolsUseCase";
import { AddToolUseCase } from "../usecases/addToolUseCase";
import { toolRepository } from "../services/toolRepository";

export const useTools = (token?: string) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUseCase = new FetchToolsUseCase(toolRepository);
  const addUseCase = new AddToolUseCase(toolRepository);

  const loadTools = async () => {
    try {
      setLoading(true);
      const data = await fetchUseCase.execute();
      setTools(data);
    } catch (err) {
      setError("Error al cargar herramientas");
    } finally {
      setLoading(false);
    }
  };

  const addTool = async (tool: Omit<Tool, "id">) => {
    if (!token) throw new Error("No autenticado");
    const newTool = await addUseCase.execute(tool, token);
    setTools((prev) => [...prev, newTool]);
  };

  useEffect(() => {
    loadTools();
  }, []);

  return { tools, loading, error, addTool };
};
