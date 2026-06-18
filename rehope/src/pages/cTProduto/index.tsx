import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import styles from "@/pages/cCategoria/cCategoria.module.css";
import { useState } from "react";
import { erro, notificacao } from "@/utils/toast";
import { cadastrarTipoProduto } from "../api/genericService";

const CadastroTipoProduto = () => {
  const [nomeTipo, setNomeTipo] = useState<string>("");

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarTipoProduto({ nomeProduto: nomeTipo } as any);

      notificacao("Tipo de produto cadastrado com sucesso!");
      setNomeTipo("");
    } catch (error: any) {
      erro(error.message || "Erro ao cadastrar tipo de produto.");
    }
  }

  return (
    <>
      <Header />

      <main className="min_height">
        <section className="container column" id={styles.width}>
          <form className="form info2" onSubmit={handleCadastro}>
            <h1>Criar Tipo de Produto</h1>

            <div className="campo_form max_width">
              <Lucide name="Type" className="lucide" />
              <input
                type="text"
                id="nome"
                placeholder=" "
                className="input"
                value={nomeTipo}
                onChange={(e) => setNomeTipo(e.target.value)}
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

export default CadastroTipoProduto;
