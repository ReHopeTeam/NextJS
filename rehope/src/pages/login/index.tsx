import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { login } from "../api/authService";
import { erro, notificacao } from "@/utils/toast";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const router = useRouter();

  async function autenticar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(email, senha);
      notificacao("Login bem sucedido!");

      setTimeout(() => {
        router.push("/home");
      }, 3000);
    } catch (error: any) {
      erro(error.response?.data || "Erro ao fazer login");
    }
  }

  return (
    <main id={styles.login}>
      <div className="img_wrapper">
        <img
          src="/imgs/ImagemDoLogin.png"
          alt="Imagem do Bazar ReHope"
          id={styles.login_img}
        />
      </div>
      <section id={styles.login_form} className="column">
        <form className="form" onSubmit={autenticar}>
          <h1 className="h1 white">Login</h1>

          <div className="campo_form">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="input2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="label">
              Email
            </label>
          </div>

          <div className="campo_form">
            <input
              type="password"
              id="senha"
              placeholder=" "
              className="input2"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <label htmlFor="senha" className="label">
              Senha
            </label>
          </div>
          <button type="submit" className="btn">
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
