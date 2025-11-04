// export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
const API_URL = 'http://localhost:3000';

export const getTools = async () => {
  const res = await fetch(`${API_URL}/tools`);
  if (!res.ok) throw new Error('Error al obtener las herramientas');
  return res.json();
};

export const addTool = async (name: string, description: string) => {
  const res = await fetch(`${API_URL}/tools`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) throw new Error('Error al agregar la herramienta');
  return res.json();
};
