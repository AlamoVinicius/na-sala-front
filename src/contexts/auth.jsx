// informações globais
import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext(); // cria um contexto global para aplicação

export const Authprovider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // impedir aplicação perder o login ao dar refresh:
  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = async ({ username, password }) => {
    try {
      setErrorMsg(null);
      setLoading(true);
      const response = await createSession(username.trim(), password.trim());
      const loggedUser = response.data;
      const token = loggedUser?.token;
      localStorage.setItem("user", JSON.stringify(loggedUser.user));
      localStorage.setItem("token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(loggedUser.user);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMsg(error?.response?.data?.error ?? "ocorreu um erro ao tentar fazer login");
    } finally {
      setLoading(false);
    }
  };

  // informações provisorias para adminstração do frontend
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;

    setUser(null);
    navigate("/login");
  };

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 403 && error?.response?.data?.error === "User is blocked") {
        logout();
      }
      return Promise.reject(error);
    }
  );

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
