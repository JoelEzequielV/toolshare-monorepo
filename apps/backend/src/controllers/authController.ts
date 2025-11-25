import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// NOTE: estos controladores son un ejemplo. En producción usar tu modelo/DB real.
const usersDb: { id: number; name: string; email: string; passwordHash: string }[] = [];
let userIdCounter = 1;

export async function registerController(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Faltan datos" });

  const exists = usersDb.find((u) => u.email === email);
  if (exists) return res.status(409).json({ error: "Usuario ya existe" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: userIdCounter++, name, email, passwordHash };
  usersDb.push(user);

  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "8h" });

  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
}

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Faltan datos" });

  const user = usersDb.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "8h" });

  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
}
