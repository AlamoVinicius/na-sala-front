import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { Spinner } from "react-bootstrap";

import styles from "./Login.module.css";
import logo from "../../assets/imgs/logo.png";
import Alert from "../layout/Alert";
import { BackdropLoading } from "../feedbacks/LoadingBackDrop";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { authenticated, login, errorMsg, loading } = useContext(AuthContext);

  const [credetinals, setCredentials] = useState({ username: "", password: "" });

  const [showMessageError, setShowMessageError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credetinals);
    !authenticated ? setShowMessageError(true) : setShowMessageError(false);
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
          <img src={logo} alt="na sala logo" />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Digite seu nome de usuário"
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
          {showMessageError ? <Alert severity={"error"} msg={errorMsg} /> : null}
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
