import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import styles from "@/pages/cCategoria/cCategoria.module.css";
import { useState } from "react";
import { erro, notificacao } from "@/utils/toast";
import { cadastrarLocalizacao } from "../api/genericService";

const CadastroLocalizacao = () => {
  const [localizacao, setLocalizacao] = useState<string>("");
  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarLocalizacao({ nomeLocalizacao: localizacao });

      notificacao("Cadastro realizado com sucesso!");
      setLocalizacao("");
    } catch (error: any) {
      erro(error.message);
    }
  }

  return (
    <>
      <Header />

      <main className="min_height">
        <section className="container column" id={styles.width}>
          <form className="form info2" onSubmit={handleCadastro}>
            <h1>Criar Localização</h1>

            <div className="campo_form max_width">
              <Lucide name="MapPinPlus" className="lucide" />
              <input
                type="text"
                id="nomeLocalizacao"
                placeholder=" "
                className="input"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
              />
              <label htmlFor="nomeLocalizacao" className="label">
                Nome
              </label>
            </div>

            <div className="row">
              <Link href="/home" className="btn2">
                Voltar
              </Link>

              <Button type="submit" children="Salvar" />
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CadastroLocalizacao;
