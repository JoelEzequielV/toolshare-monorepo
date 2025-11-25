import { AuthResponse } from "../types/User";

const BASE_URL = "http://localhost:3000";

export const authRepository = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error("Credenciales inválidas");
    return res.json();
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) throw new Error("Error al registrar usuario");
    return res.json();
  }
};
