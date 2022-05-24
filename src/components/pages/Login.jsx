import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import styles from "./Login.module.css";
import logo from "../../assets/imgs/icone-naSala.png"
import Alert from "../layout/Alert";

const Login = () => {
  const { authenticated, login, errorMsg } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [showMessageError, setShowMessageError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    login(user, password);
    !authenticated ? setShowMessageError(true) : setShowMessageError(false);
  };

  return (
    <div className={styles.container_login}>
      <div className={styles.login_box}>
        <form onSubmit={handleSubmit}>
          <h1>Na sala House</h1>
          <img src={logo} alt="na sala logo" />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Digite seu nome de usuário"
            autoComplete="on"
            name="username"
            id="username"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="digite a sua senha"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          {showMessageError ? (
            <Alert severity={"error"} msg={errorMsg} />
          ) : null}
          <div className={styles.btn_area}>
            <button className={styles.btn}>Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
