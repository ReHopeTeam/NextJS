import { useState } from "react";
import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import { erro, notificacao } from "@/utils/toast";
import { cadastrarUsuario } from "../api/genericService";

const CadastroUsuario = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  async function salvarUsuario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const dados = {
        nome,
        email,
        senha,
        telefone,
      };

      await cadastrarUsuario(dados);
      notificacao("Usuário cadastrado!");
    } catch (error: any) {
      erro("Erro ao cadastrar!");
    }
  }

  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column">
          {/* Adicionado o onSubmit aqui */}
          <form className="form info2" onSubmit={salvarUsuario}>
            <h1>Criar Usuário</h1>

            <div className="campo_form max_width">
              <Lucide name="UserRoundPlus" className="lucide" />
              <input
                type="text"
                id="nome"
                placeholder=" "
                className="input"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <label htmlFor="nome" className="label">
                Nome
              </label>
            </div>

            <div className="campo_form max_width">
              <Lucide name="MailPlus" className="lucide" />
              <input
                type="email"
                id="email"
                placeholder=" "
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="label">
                E-Mail
              </label>
            </div>

            <div className="campo_form max_width">
              <Lucide name="Lock" className="lucide" />
              <input
                type="text"
                id="senha"
                placeholder=" "
                className="input"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <label htmlFor="senha" className="label">
                Senha
              </label>
            </div>

            <div className="campo_form max_width">
              <Lucide name="Phone" className="lucide" />
              <input
                type="text"
                id="telefone"
                placeholder=" "
                className="input"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
              <label htmlFor="telefone" className="label">
                Telefone
              </label>
            </div>

            <div className="row">
              <Link href="/home" className="btn2">
                Voltar
              </Link>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CadastroUsuario;
