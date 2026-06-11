import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";

const CadastroCategoria = () => {
  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column">
          <form className="form">
            <h1>Criar Categoria</h1>
            <div className="campo_form">
              <input
                type="text"
                id="criarCategoria"
                placeholder=" "
                className="input"
                required
              />
              <label htmlFor="criarCategoria" className="label">
                Nome da Categoria
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

export default CadastroCategoria;
