import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LoginUseCase } from "../usecases/loginUseCase";
import { authRepository } from "../services/authRepository";

const LoginPage = () => {
  const { loginContext } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loginUseCase = new LoginUseCase(authRepository);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { token, user } = await loginUseCase.execute(email, password);
      loginContext(user, token);
    } catch (error) {
      setErr((error as Error).message || "Error en login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Iniciar sesión</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>{loading ? "Cargando..." : "Ingresar"}</button>
    </form>
  );
};

export default LoginPage;
