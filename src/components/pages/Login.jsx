import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import styles from "./Login.module.css";

const Login = () => {

  const { authenticated, login } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { user, password });
    login(user, password)  // integração com o context e api do backend
  };

  return (
    <div className={styles.glass_efect}>
      <form onSubmit={handleSubmit}>
        <h1>Na sala House</h1>
        <p>{String(authenticated)}</p>
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
        <div className={styles.btn}>
          <button>login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
