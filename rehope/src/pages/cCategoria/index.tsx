import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import styles from "@/pages/cCategoria/cCategoria.module.css"
import { useEffect, useRef, useState } from "react";

const CONFIG_SELECTS = {
  tipo: {
    label: "Tipo",
    icone: "Type" as const,
    opcoes: [
      { value: "1", label: "Tipo 1" },
      { value: "2", label: "Tipo 2" },
    ],
  },
};

const CadastroCategoria = () => {
  const [valorTipo, setValorTipo] = useState("");
  const [selectAberto, setSelectAberto] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fecharAoClicarFora = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        setSelectAberto(false);
      }
    };

    document.addEventListener("mousedown", fecharAoClicarFora);

    return () => {
      document.removeEventListener("mousedown", fecharAoClicarFora);
    };
  }, []);

  const alternarSelect = () => {
    setSelectAberto((prev) => !prev);
  };

  const handleSelecionarOpcao = (valor: string) => {
    setValorTipo(valor);
    setSelectAberto(false);
  };

  const config = CONFIG_SELECTS.tipo;

  const labelExibida =
    config.opcoes.find((opcao) => opcao.value === valorTipo)?.label || "";

  return (
    <>
      <Header />

      <main className="min_height">
        <section className="container column" id={styles.width}>
          <form className="form info2" ref={formRef}>
            <h1>Criar Categoria</h1>

            <div className="campo_form max_width">
              <Lucide name="Grid2X2Plus" className="lucide" />
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

            <div
              className={`campo_select max_width${selectAberto ? "open" : ""
                } ${valorTipo ? "has-value" : ""}`}
            >
              <Lucide
                name={config.icone}
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

              <label className="label">{config.label}</label>

              {selectAberto && (
                <ul
                  className="dropdown_options"
                  style={{ display: "block" }}
                >
                  <li onClick={() => handleSelecionarOpcao("")}>
                    <Lucide
                      name="RectangleEllipsis"
                      className="reset_lucide"
                    />
                    Nenhum
                  </li>

                  {config.opcoes.map((opcao) => (
                    <li
                      key={opcao.value}
                      onClick={() =>
                        handleSelecionarOpcao(opcao.value)
                      }
                    >
                      {opcao.label}
                    </li>
                  ))}
                </ul>
              )}
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

export default CadastroCategoria;