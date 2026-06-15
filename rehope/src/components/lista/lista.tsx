import { useEffect, useState, useRef, Fragment } from "react";
import styles from "./lista.module.css";
import Card from "@/components/cards/cards";
import Lucide from "@/utils/lucide";
import { listar } from "@/pages/api/mockService";
import { erro } from "@/utils/toast";

type Produto = {
  produtoID: number;
  nome: string;
  preco: string;
};

const LABELS_ORDENACAO: Record<string, string> = {
  "": "",
  menor: "Menor Preço",
  maior: "Maior Preço",
  alfabetica: "A-Z",
  "alfabetica-contraria": "Z-A",
};

const ICONES_ORDENACAO: Record<
  string,
  | "Filter"
  | "ChartNoAxesColumnDecreasing"
  | "ChartNoAxesColumnIncreasing"
  | "ArrowDownAZ"
  | "ArrowDownZA"
> = {
  "": "Filter",
  menor: "ChartNoAxesColumnDecreasing",
  maior: "ChartNoAxesColumnIncreasing",
  alfabetica: "ArrowDownAZ",
  "alfabetica-contraria": "ArrowDownZA",
};

const Lista = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenacao, setOrdenacao] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [produto, setProduto] = useState<Produto[]>([]);
  const [selectAberto, setSelectAberto] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listarJogo();
  }, []);

  useEffect(() => {
    const fecharAoClicarFora = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setSelectAberto(false);
      }
    };

    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  async function listarJogo() {
    try {
      const response = await listar();
      setProduto(response);
    } catch (error: any) {
      erro(error.message || "Erro ao carregar a lista.");
    }
  }

  const itensPorPagina = 5;

  const converterPreco = (precoStr: string): number => {
    return parseFloat(
      precoStr.replace("R$ ", "").replace(".", "").replace(",", "."),
    );
  };

  const produtosFiltrados = produto.filter((p) =>
    p.nome.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  const produtosOrdenados = [...produtosFiltrados];

  if (ordenacao === "menor") {
    produtosOrdenados.sort(
      (a, b) => converterPreco(a.preco) - converterPreco(b.preco),
    );
  } else if (ordenacao === "maior") {
    produtosOrdenados.sort(
      (a, b) => converterPreco(b.preco) - converterPreco(a.preco),
    );
  } else if (ordenacao === "alfabetica") {
    produtosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (ordenacao === "alfabetica-contraria") {
    produtosOrdenados.sort((a, b) => b.nome.localeCompare(a.nome));
  }

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;

  const produtosPaginados = produtosOrdenados.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(produtosOrdenados.length / itensPorPagina);

  const cardsFantasmas =
    paginaAtual === totalPaginas
      ? itensPorPagina - produtosPaginados.length
      : 0;

  const cardsExibidos = [
    ...produtosPaginados,
    ...Array(cardsFantasmas).fill(null),
  ];

  const handleSelecionarOrdenacao = (valor: string) => {
    setOrdenacao(valor);
    setPaginaAtual(1);
    setSelectAberto(false);
  };

  // ========================================================
  // LÓGICA DE PAGINAÇÃO FIXA (Exemplo baseado em 5 botões)
  // ========================================================
  const maxBotoesVisiveis = 5;

  const obterIntervaloPaginas = () => {
    // Se o total de páginas for menor que o máximo permitido, mostra todas
    if (totalPaginas <= maxBotoesVisiveis) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }

    // Calcula metade dos botões para tentar centralizar a página atual
    const metadeJulgada = Math.floor(maxBotoesVisiveis / 2);
    let inicio = paginaAtual - metadeJulgada;
    let fim = paginaAtual + metadeJulgada;

    // Ajusta o início se bater na borda esquerda (início da paginação)
    if (inicio < 1) {
      inicio = 1;
      fim = maxBotoesVisiveis;
    }

    // Ajusta o fim se bater na borda direita (fim da paginação)
    if (fim > totalPaginas) {
      fim = totalPaginas;
      inicio = totalPaginas - maxBotoesVisiveis + 1;
    }

    return Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);
  };

  const paginasVisiveis = obterIntervaloPaginas();

  return (
    <section>
      <div className="row sbs" id={styles.filtros}>
        {/* Input de Pesquisa */}
        <div className="campo_form">
          <Lucide name="Search" className="lucide" />
          <input
            type="text"
            id="pesquisa"
            placeholder=" "
            className="input"
            value={pesquisa}
            onChange={(e) => {
              setPesquisa(e.target.value);
              setPaginaAtual(1);
            }}
          />
          <label htmlFor="pesquisa" className="label">
            Pesquise seu produto...
          </label>
        </div>

        {/* Select Customizado em React */}
        <div
          className={`campo_select ${selectAberto ? "open" : ""} ${ordenacao ? "has-value" : ""}`}
          ref={selectRef}
        >
          <Lucide
            name={ICONES_ORDENACAO[ordenacao]}
            className="lucide rotate"
            style={{
              transition: "transform 0.2s ease",
              transform: selectAberto
                ? "translateY(-50%) rotate(180deg)"
                : "translateY(-50%)",
            }}
          />

          <div
            className="select"
            tabIndex={0}
            onClick={() => setSelectAberto(!selectAberto)}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              paddingLeft: "50px",
            }}
          >
            <span>{LABELS_ORDENACAO[ordenacao]}</span>
          </div>

          <label className="label">Filtrar</label>

          {selectAberto && (
            <ul className="dropdown_options" style={{ display: "block" }}>
              <li onClick={() => handleSelecionarOrdenacao("")}>
                <Lucide name="RectangleEllipsis" className="reset_lucide" />
                Nenhum
              </li>
              <li onClick={() => handleSelecionarOrdenacao("menor")}>
                <Lucide
                  name="ChartNoAxesColumnDecreasing"
                  className="reset_lucide"
                />
                Menor Preço
              </li>
              <li onClick={() => handleSelecionarOrdenacao("maior")}>
                <Lucide
                  name="ChartNoAxesColumnIncreasing"
                  className="reset_lucide"
                />
                Maior Preço
              </li>
              <li onClick={() => handleSelecionarOrdenacao("alfabetica")}>
                <Lucide name="ArrowDownAZ" className="reset_lucide" />
                A-Z
              </li>
              <li
                onClick={() =>
                  handleSelecionarOrdenacao("alfabetica-contraria")
                }
              >
                <Lucide name="ArrowDownZA" className="reset_lucide" />
                Z-A
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Listagem de Cards */}
      <ul className="row">
        {cardsExibidos.map((item, index) => (
          <Card
            key={item?.produtoID ?? `fantasma-${index}`}
            fantasma={!item}
            {...(item || {})}
          />
        ))}
      </ul>

      {/* Paginação Estabilizada */}
      {totalPaginas > 1 && (
        <nav>
          <ul id={styles.paginacao}>
            {/* Botão Começo */}
            <li
              className="btn"
              onClick={() => paginaAtual > 1 && setPaginaAtual(1)}
              style={{
                opacity: paginaAtual === 1 ? 0.5 : 1,
                cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
              }}
            >
              {"<<"}
            </li>

            {/* Botão Anterior */}
            <li
              className="btn"
              onClick={() => paginaAtual > 1 && setPaginaAtual(paginaAtual - 1)}
              style={{
                opacity: paginaAtual === 1 ? 0.5 : 1,
                cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
              }}
            >
              {"<"}
            </li>

            {/* Renderização das páginas calculadas */}
            {paginasVisiveis.map((pagina) => (
              <li
                key={`pag-${pagina}`}
                onClick={() => setPaginaAtual(pagina)}
                className={`${paginaAtual === pagina ? "btn" : "btn2"}`}
              >
                {pagina}
              </li>
            ))}

            {/* Botão Próximo */}
            <li
              className="btn"
              onClick={() =>
                paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1)
              }
              style={{
                opacity: paginaAtual === totalPaginas ? 0.5 : 1,
                cursor:
                  paginaAtual === totalPaginas ? "not-allowed" : "pointer",
              }}
            >
              {">"}
            </li>

            {/* Botão Último */}
            <li
              className="btn"
              onClick={() =>
                paginaAtual < totalPaginas && setPaginaAtual(totalPaginas)
              }
              style={{
                opacity: paginaAtual === totalPaginas ? 0.5 : 1,
                cursor:
                  paginaAtual === totalPaginas ? "not-allowed" : "pointer",
              }}
            >
              {">>"}
            </li>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default Lista;
