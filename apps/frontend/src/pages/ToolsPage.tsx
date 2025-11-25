import { useContext, useState } from "react";
import { useTools } from "../hooks/useTools";
import { AuthContext } from "../context/AuthContext";

const ToolsPage = () => {
  const { token } = useContext(AuthContext);
  const { tools, loading, error, addTool } = useTools(token ?? undefined);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTool({ name, description, available: true });
    setName("");
    setDescription("");
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Herramientas</h1>

      {token && (
        <form onSubmit={onSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
          <button type="submit">Agregar</button>
        </form>
      )}

      <ul>
        {tools.map(t => (
          <li key={t.id}>{t.name} — {t.available ? "Disponible" : "Prestada"}</li>
        ))}
      </ul>
    </>
  );
};

export default ToolsPage;
