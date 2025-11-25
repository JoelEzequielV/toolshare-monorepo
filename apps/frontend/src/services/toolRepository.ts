import { Tool } from "../types/Tool";

const BASE_URL = "http://localhost:3000";

export const toolRepository = {
  fetchAll: async (): Promise<Tool[]> => {
    const res = await fetch(`${BASE_URL}/tools`);
    if (!res.ok) throw new Error("Error al obtener herramientas");
    return res.json();
  },

  add: async (tool: Omit<Tool, "id">, token: string): Promise<Tool> => {
    const res = await fetch(`${BASE_URL}/tools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(tool)
    });

    if (!res.ok) throw new Error("Error al agregar herramienta");

    return res.json();
  }
};
