import { useState } from "react";

import styles from "./Login.module.css";

const Login = () => {
  const [user, setUser] = (useState = "");
  const [password, setPassword] = (useState = "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello world");
  };

  return (
    <div class={styles.glass_efect}>
      <form onSubmit={handleSubmit}>
        <h1>Na sala House</h1>
        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Digite seu nome de usuário"
          autocomplete="on"
          name="username"
          id="username"
        />
        <label for="password">Senha</label>
        <input type="password" placeholder="digite a sua senha" id="password" />
        <div class="btn">
          <button>login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
