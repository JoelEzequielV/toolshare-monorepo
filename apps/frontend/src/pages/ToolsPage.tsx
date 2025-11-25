import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTools } from "../hooks/useTools";

const ToolsPage = () => {
  const { token } = useAuth();
  const { tools, loading, error, addTool } = useTools(token ?? undefined);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitErr, setSubmitErr] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setSubmitErr("Debes iniciar sesión para agregar herramientas");
      return;
    }
    try {
      await addTool({ name, description, available: true });
      setName("");
      setDescription("");
      setSubmitErr(null);
    } catch (err) {
      setSubmitErr((err as Error).message || "Error al agregar herramienta");
    }
  };

  if (loading) return <div>Cargando herramientas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Herramientas</h1>

      {token ? (
        <form onSubmit={handleAdd}>
          <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Agregar</button>
          {submitErr && <p style={{ color: "red" }}>{submitErr}</p>}
        </form>
      ) : (
        <p>Inicia sesión para agregar herramientas</p>
      )}

      <ul>
        {tools.map((t) => (
          <li key={t.id}>
            <strong>{t.name}</strong> — {t.available ? "Disponible" : "Prestada"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsPage;
