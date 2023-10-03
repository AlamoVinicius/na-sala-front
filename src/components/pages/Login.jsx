import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import styles from "./Login.module.css";
import logo from "../../assets/imgs/logo.png";
import { BackdropLoading } from "../feedbacks/LoadingBackDrop";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { authenticated, login, loading } = useContext(AuthContext);

  const [credetinals, setCredentials] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = {
      [credetinals.username.includes("@") ? "email" : "username"]: credetinals.username,
      password: credetinals.password,
    };

    try {
      await login(userCredentials);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credetinals, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authenticated) navigate("/");
  }, [authenticated, navigate]);

  return (
    <div className={styles.container_login}>
      <div className={styles.login_box}>
        <form onSubmit={handleSubmit}>
          <img src={logo} alt="na sala logo" style={{ width: 150, height: 80, marginBlock: 50 }} />
          <label htmlFor="username">Email / Username</label>
          <input
            type="text"
            placeholder="Digite seu email"
            autoComplete="on"
            name="username"
            id="username"
            value={credetinals.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="digite a sua senha"
            id="password"
            value={credetinals.password}
            name="password"
            onChange={handleChange}
          />
          <div className={styles.btn_area}>
            <button className={styles.btn}>ENTRAR</button>
          </div>
        </form>
      </div>
      {loading && <BackdropLoading />}
    </div>
  );
};

export default Login;
