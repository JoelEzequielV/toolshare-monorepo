import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginController, registerController } from "./controllers/authController";
import { listTools, createTool, loanTool } from "./controllers/toolController";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:6006"] })); // dev + storybook origin

// Auth routes (exponemos ambas formas para compatibilidad)
app.post("/auth/login", loginController);
app.post("/auth/register", registerController);
app.post("/login", loginController);
app.post("/register", registerController);

// Tools
app.get("/tools", listTools);
// proteger creación y préstamo de herramientas
app.post("/tools", authMiddleware, createTool);
app.post("/tools/:id/loan", authMiddleware, loanTool);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
