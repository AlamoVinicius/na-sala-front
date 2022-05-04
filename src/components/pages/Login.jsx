import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import styles from "./Login.module.css";

import Container from "../layout/Container";
import Alert from "../layout/Alert";

const Login = () => {
  const { authenticated, login, errorMsg } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [showMessageError, setShowMessageError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("submit", { user, password });
    console.log(errorMsg);
    login(user, password); // integração com o context e api do backend
    !authenticated ? setShowMessageError(true) : setShowMessageError(false);
    setTimeout(() => {
      setShowMessageError(false);
    }, 3000);
  };

  return (
    <Container customClass="backgroundLogin">
      <div className={styles.login_box}>
        <form onSubmit={handleSubmit}>
          <h1>Na sala House</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Digite seu nome de usuário"
            autoComplete="on"
            name="username"
            id="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="digite a sua senha"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {showMessageError ? (
            <Alert severity={"error"} msg={errorMsg} />
          ) : null}
          <div className={styles.btn_area}>
            <button className={styles.btn}>Entrar</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
