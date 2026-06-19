import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import { useEffect, useRef, useState } from "react";
import { erro, notificacao } from "@/utils/toast";
import {
  cadastrarCategoria,
  listarTipoProduto,
  TipoProduto,
} from "../api/genericService";

const CadastroCategoria = () => {
  const [categoria, setCategoria] = useState("");
  const [valorTipo, setValorTipo] = useState("");
  const [selectAberto, setSelectAberto] = useState(false);
  const [tiposProduto, setTiposProduto] = useState<TipoProduto[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function carregarTipos() {
      try {
        const dados = await listarTipoProduto();

        if (Array.isArray(dados)) {
          setTiposProduto(dados);
        } else {
          setTiposProduto([]);
        }
      } catch (err: any) {
        console.error("Erro detalhado ao buscar tipos:", err);
        erro("Não foi possível carregar os tipos de produto.");
        setTiposProduto([]);
      }
    }
    carregarTipos();
  }, []);

  useEffect(() => {
    const fecharAoClicarFora = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setSelectAberto(false);
      }
    };

    document.addEventListener("mousedown", fecharAoClicarFora);

    return () => {
      document.removeEventListener("mousedown", fecharAoClicarFora);
    };
  }, []);

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!valorTipo) {
      erro("Selecione um tipo.");
      return;
    }

    try {
      await cadastrarCategoria({
        nomeCategoria: categoria,
        tipoProdutoID: Number(valorTipo),
      });

      notificacao("Cadastro realizado com sucesso!");

      setCategoria("");
      setValorTipo("");
    } catch (error: any) {
      erro(error.message);
    }
  }

  const alternarSelect = () => {
    setSelectAberto((prev) => !prev);
  };

  const handleSelecionarOpcao = (valor: string) => {
    setValorTipo(valor);
    setSelectAberto(false);
  };

  const labelExibida =
    tiposProduto?.find((tipo: any) => {
      return String(tipo.tipoId) === valorTipo;
    })?.nomeTipo || "";

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

        <section className="container column max_width">
          <form className="form info2" ref={formRef} onSubmit={handleCadastro}>
            <h1>Criar Categoria</h1>

            <div className="campo_form max_width">
              <Lucide name="Grid2X2Plus" className="lucide" />
              <input
                type="text"
                id="nomeCategoria"
                placeholder=" "
                className="input"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
              <label htmlFor="nomeCategoria" className="label">
                Nome
              </label>
            </div>

            <div
              className={`campo_select max_width ${
                selectAberto ? "open" : ""
              } ${valorTipo ? "has-value" : ""}`}
            >
              <Lucide
                name="Package"
                className="lucide rotate"
                style={{
                  transition: "transform 0.2s ease",
                  transform: selectAberto
                    ? "translateY(-50%) rotate(180deg)"
                    : "translateY(-50%)",
                }}
              />

              <div
                className="select max_width"
                tabIndex={0}
                onClick={alternarSelect}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  paddingLeft: "50px",
                }}
              >
                <span>{labelExibida}</span>
              </div>

              <label className="label">Tipo</label>

              {selectAberto && (
                <ul className="dropdown_options" style={{ display: "block" }}>
                  <li onClick={() => handleSelecionarOpcao("")}>
                    <Lucide name="RectangleEllipsis" className="reset_lucide" />
                    Nenhum
                  </li>

                  {tiposProduto?.map((tipo: any) => (
                    <li
                      key={tipo.tipoId}
                      onClick={() => handleSelecionarOpcao(String(tipo.tipoId))}
                    >
                      {tipo.nomeTipo}
                    </li>
                  ))}
                </ul>
              )}
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

export default CadastroCategoria;
