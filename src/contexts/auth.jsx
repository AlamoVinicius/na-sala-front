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
    // const recoveredUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const getUserInfo = async () => {
      try {
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const { data } = await getInfoUser();

          setUser({
            ...data,
          });
        }
      } catch (error) {
        if (error.response.status === 401) logout();
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const login = async (credentials) => {
    const credentialLogin = {
      [credentials.email ? "email" : "username"]: credentials.email
        ? credentials.email.trim()
        : credentials.username.trim(),
      password: credentials.password.trim(),
    };

    try {
      setErrorMsg(null);
      setLoading(true);
      const { data } = await createSession(credentialLogin);

      const token = data?.token;
      localStorage.setItem("token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const userdata = await getInfoUser(data.id);
      setUser(userdata.data);
    } catch (error) {
      throw new Error(error?.response?.data?.error ?? "ocorreu um erro ao tentar fazer login");
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
