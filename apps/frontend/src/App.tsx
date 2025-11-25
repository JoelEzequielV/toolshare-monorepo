import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ToolsPage from "./pages/ToolsPage";
import LoginPage from "./pages/LoginPage";

const AppRouter = () => {
  const { token } = useAuth();
  return token ? <ToolsPage /> : <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
