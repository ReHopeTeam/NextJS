import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import styles from "@/pages/cCategoria/cCategoria.module.css"

const CadastroLocalizacao = () => {

  return (
    <>
      <Header />

      <main className="min_height">
        <section className="container column" id={styles.width}>
          <form className="form info2">
            <h1>Criar Tipo de Produto</h1>

            <div className="campo_form max_width">
              <Lucide name="Type" className="lucide" />
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

            <div className="row">
              <Link href="/home" className="btn2">
                Voltar
              </Link>

              <Button children="Salvar" />
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CadastroLocalizacao;