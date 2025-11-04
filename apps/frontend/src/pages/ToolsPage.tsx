import React, { useEffect, useState } from 'react';
import { getTools, addTool } from '../services/api';
import { ToolCard } from '../components/ToolCard';

export const ToolsPage: React.FC = () => {
  const [tools, setTools] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    getTools().then(setTools).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTool = await addTool(form.name, form.description);
    setTools([...tools, newTool]);
    setForm({ name: '', description: '' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mis Herramientas</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          style={{ margin: '0.5rem', padding: '0.5rem' }}
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
         style={{ margin: '0.5rem', padding: '0.5rem' }}
          type="text"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>

      <div style={{ display: 'grid', gap: '1rem', color: 'black' }}>
        {tools.map((tool) => (
          <ToolCard key={tool.id} {...tool} />
        ))}
      </div>
    </div>
  );
};
