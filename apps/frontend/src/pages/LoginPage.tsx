import { useContext, useState } from "react";
import { LoginUseCase } from "../usecases/loginUseCase";
import { authRepository } from "../services/authRepository";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUseCase = new LoginUseCase(authRepository);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { token, user } = await loginUseCase.execute(email, password);
    login(user, token);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Iniciar sesión</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default LoginPage;
