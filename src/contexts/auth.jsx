// informações globais
import React, { useState, createContext, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession, getInfoUser } from "../services/api";
import { useQueryClient } from "react-query";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const Authprovider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const queryClient = useQueryClient();

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    queryClient.removeQueries();

    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const recoveredUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const getUserInfo = async () => {
      try {
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const { data } = await getInfoUser(recoveredUser.id);

          setUser({
            ...recoveredUser,
            studioId: data.studioId,
          });
        }
      } catch (error) {
        if (error.response.status === 401) logout();
        console.log(error);
      }
    };

    getUserInfo();

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
