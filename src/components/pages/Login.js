import styles from './Login.module.css'

const Login = () => {
    return (
        <div class={styles.glass_efect}>
            <h1>Na sala House</h1>
            <label for="username">Username</label>
            <input type="text" placeholder="Digite seu nome de usuário" autocomplete="on" name="username" id="username" />
            <label for="password">Senha</label>
            <input type="password" placeholder="digite a sua senha" id="password" />
            <div class="btn"><button>login</button></div>
        </div>)
}

export default Login