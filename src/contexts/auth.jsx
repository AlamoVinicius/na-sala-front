// informações globais
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(); // cria um contexto global para aplicação

export const Authprovider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // impedir aplicação perder o login ao dar refresh:
  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = (username, password) => {
    console.log("login", { username, password });
    // api session resp simulation
    const loggedUser = {
      // dados testes para desenvolvimento sem conexão com database
      id: "123",
      username,
    };

    localStorage.setItem("user", JSON.stringify(loggedUser)); // guardar dados na navegação

    if (password === "secret") {
      setUser(loggedUser);
      navigate("/");
    }
  };
  // informações provisorias para adminstração do frontend
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  //user != null authenticated = true
  //user == null authenticated = false
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
