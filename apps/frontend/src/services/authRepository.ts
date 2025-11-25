import { AuthResponse } from "../types/User";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const authRepository = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      throw new Error(payload?.error || "Error en login");
    }
    return res.json();
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      throw new Error(payload?.error || "Error en registro");
    }
    return res.json();
  },
};

