import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import { useState } from "react";
import { erro, notificacao } from "@/utils/toast";
import { cadastrarTipoProduto } from "../api/genericService";

const CadastroTipoProduto = () => {
  const [nomeTipo, setNomeTipo] = useState<string>("");

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarTipoProduto({ nomeTipo: nomeTipo } as any);

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
        <svg
          width="265"
          height="592"
          viewBox="0 0 265 592"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed"
          style={{ left: "0", top: "240" }}
        >
          <path
            d="M-1.86295 104.196C123.047 137.918 143.137 -39.8031 202.637 
            30.6968C262.137 101.197 148.637 111.197 132.137 202.697C115.637 
            294.197 208.638 265.196 242.121 336.696C275.605 408.195 198.138 
            502.197 122.138 484.696C46.1375 467.195 -32 577.619 -32 577.619"
            className="path2"
            stroke-width="20"
            stroke-linecap="round"
          />
        </svg>

        <svg
          width="265"
          height="592"
          viewBox="0 0 265 592"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed"
          style={{ right: "-100", top: "90" }}
        >
          <path
            d="M173.295 409.198C173.295 409.198 69.7944 381.967 57.7955 328.197C45.3221 
            272.301 118.796 295.197 135.296 203.697C151.796 112.197 55.2792 221.197 21.7954 
            149.697C-11.6883 78.1978 31.242 34.2975 86.2959 13.6974C129.816 -2.58704 202.294 40.1974 202.294 40.1974"
            className="path2"
            stroke-width="20"
            stroke-linecap="round"
          />
        </svg>
        <section className="container column">
          <form className="form info2" onSubmit={handleCadastro}>
            <h1>Criar Tipo de Produto</h1>

            <div className="campo_form max_width">
              <Lucide name="PackagePlus" className="lucide" />
              <input
                type="text"
                id="nomeTipo"
                placeholder=" "
                className="input"
                value={nomeTipo}
                onChange={(e) => setNomeTipo(e.target.value)}
                required
              />
              <label htmlFor="nomeTipo" className="label">
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

export default CadastroTipoProduto;
