import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";

const CadastroUsuario = () => {
  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column">
          <form className="form info2">
            <h1>Criar Usuário</h1>
            <div className="campo_form max_width">
              <Lucide name="User" className="lucide" />
              <input
                type="text"
                id="nome"
                placeholder=" "
                className="input"
                required
              />
              <label htmlFor="nome" className="label">
                Nome
              </label>
            </div>
            <div className="campo_form max_width">
              <Lucide name="Mail" className="lucide" />
              <input
                type="text"
                id="email"
                placeholder=" "
                className="input"
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
                required
              />
              <label htmlFor="telefone" className="label">
                Telefone
              </label>
            </div>
            <div className="row">
              <Link href="/home" children="Voltar" className="btn2" />
              <Button children="Salvar" />
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CadastroUsuario;
