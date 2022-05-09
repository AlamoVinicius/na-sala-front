// informações globais
import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext(); // cria um contexto global para aplicação

export const Authprovider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // impedir aplicação perder o login ao dar refresh:
  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token")

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = (username, password) => {
     createSession(username, password)
      .then(response => {
        const loggedUser = response.data.user;
        const token = response.data.token;

        localStorage.setItem("user", JSON.stringify(loggedUser)); // guardar usuario durante uso da aplicação
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(loggedUser);
        navigate("/");
        console.log("login", response);
      })
      .catch(err => setErrorMsg(err.response.data.error));
  };

  // informações provisorias para adminstração do frontend
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;

    setUser(null);
    navigate("/login");
  };

  //user != null authenticated = true
  //user == null authenticated = false
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout, errorMsg }} // sinal !!user => cast for boolean == boolean()
    >
      {children}
    </AuthContext.Provider>
  );
};
