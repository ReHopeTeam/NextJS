import { useEffect, useState, useRef } from "react";
import styles from "./lista.module.css";
import Card from "@/components/cards/cards";
import Lucide from "@/utils/lucide";
import { erro } from "@/utils/toast";
import { listarProduto } from "@/pages/api/genericService";
import { desformatarPreco } from "@/utils/formatacao";

interface Produto {
  produtoID: number;
  nomeProduto: string;
  preco: string;
  descricao: string;
  tamanho: string;
  imagemUrl: string;
  statusProduto: boolean;
  codigo: number;
  categoriaID: number;
  localizacaoID: number;
  usuarioID: string;
};

const LABELS_ORDENACAO: Record<string, string> = {
  "": "",
  menor: "Menor Preço",
  maior: "Maior Preço",
  alfabetica: "A-Z",
  "alfabetica-contraria": "Z-A",
};

const ICONES_ORDENACAO: Record<string, any> = {
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

  // Estado simples para saber qual tipo de filtro de status está ativo por palavra-chave
  const [statusFiltro, setStatusFiltro] = useState<
    "todos" | "ativo" | "inativo"
  >("todos");

  useEffect(() => {
    listarProdutos();
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

  async function listarProdutos() {
    try {
      const response = await listarProduto();
      setProduto(response);
    } catch (error: any) {
      erro("Erro ao carregar a lista.");
    }
  }

  const itensPorPagina = 5;

  // ==========================================
  // FILTRAGEM COMBINADA (PESQUISA + STATUS)
  // ==========================================
  const produtosFiltrados = produto.filter((p) => {
    const correspondePesquisa = p.nomeProduto
      .toLowerCase()
      .includes(pesquisa.toLowerCase());

    // Filtra usando o valor booleano (p.ativo) do seu produto
    if (statusFiltro === "ativo")
      return correspondePesquisa && p.statusProduto === true;
    if (statusFiltro === "inativo")
      return correspondePesquisa && p.statusProduto === false;
    return correspondePesquisa; // "todos" exibe tudo
  });

  // Ordenação
  const produtosOrdenados = [...produtosFiltrados];
  if (ordenacao === "menor") {
    produtosOrdenados.sort(
      (a, b) => desformatarPreco(a.preco) - desformatarPreco(b.preco),
    );
  } else if (ordenacao === "maior") {
    produtosOrdenados.sort(
      (a, b) => desformatarPreco(b.preco) - desformatarPreco(a.preco),
    );
  } else if (ordenacao === "alfabetica") {
    produtosOrdenados.sort((a, b) => a.nomeProduto.localeCompare(b.nomeProduto));
  } else if (ordenacao === "alfabetica-contraria") {
    produtosOrdenados.sort((a, b) => b.nomeProduto.localeCompare(a.nomeProduto));
  }

  // Paginação
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

  const handleMudarStatus = (novoStatus: "todos" | "ativo" | "inativo") => {
    setStatusFiltro(novoStatus);
    setPaginaAtual(1);
  };

  const maxBotoesVisiveis = 5;
  const obterIntervaloPaginas = () => {
    if (totalPaginas <= maxBotoesVisiveis) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }
    const metadeJulgada = Math.floor(maxBotoesVisiveis / 2);
    let inicio = paginaAtual - metadeJulgada;
    let fim = paginaAtual + metadeJulgada;

    if (inicio < 1) {
      inicio = 1;
      fim = maxBotoesVisiveis;
    }
    if (fim > totalPaginas) {
      fim = totalPaginas;
      inicio = totalPaginas - maxBotoesVisiveis + 1;
    }
    return Array.from({ length: fim - inicio + 1 }, (_, i) => inicio + i);
  };

  const paginasVisiveis = obterIntervaloPaginas();

  return (
    <div id={styles.lista}>
      <div className="sbs" id={styles.filtros}>
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

        {/* Select Customizado */}
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
                <Lucide name="RectangleEllipsis" className="reset_lucide" />{" "}
                Nenhum
              </li>
              <li onClick={() => handleSelecionarOrdenacao("menor")}>
                <Lucide
                  name="ChartNoAxesColumnDecreasing"
                  className="reset_lucide"
                />{" "}
                Menor Preço
              </li>
              <li onClick={() => handleSelecionarOrdenacao("maior")}>
                <Lucide
                  name="ChartNoAxesColumnIncreasing"
                  className="reset_lucide"
                />{" "}
                Maior Preço
              </li>
              <li onClick={() => handleSelecionarOrdenacao("alfabetica")}>
                <Lucide name="ArrowDownAZ" className="reset_lucide" /> A-Z
              </li>
              <li
                onClick={() =>
                  handleSelecionarOrdenacao("alfabetica-contraria")
                }
              >
                <Lucide name="ArrowDownZA" className="reset_lucide" /> Z-A
              </li>
            </ul>
          )}
        </div>

        {/* Botões com controle de opacidade inline */}
        <div className="row">
          {/* Botão Inativo */}
          <button
            id={styles.btn_inativo}
            onClick={() => handleMudarStatus("inativo")}
            style={{
              opacity: statusFiltro === "inativo" ? 1 : 0.35,
            }}
          >
            <Lucide name="ShieldX" className="reset_lucide" />
          </button>

          {/* Botão Ativo */}
          <button
            id={styles.btn_ativo}
            onClick={() => handleMudarStatus("ativo")}
            style={{
              opacity: statusFiltro === "ativo" ? 1 : 0.35,
            }}
          >
            <Lucide name="ShieldCheck" className="reset_lucide" />
          </button>

          {/* Botão Padrão */}
          <button
            id={styles.btn_padrao}
            onClick={() => handleMudarStatus("todos")}
            style={{
              opacity: statusFiltro === "todos" ? 1 : 0.35,
            }}
          >
            <Lucide name="ShieldEllipsis" className="reset_lucide" />
          </button>
        </div>
      </div>

      {/* Listagem de Cards */}
      <ul className="sbs">
        {produtosFiltrados.length > 0 ? (
          cardsExibidos.map((item, index) => (
            <Card
              key={item?.produtoID ?? `fantasma-${index}`}
              fantasma={!item}
              {...(item || {})}
            />
          ))
        ) : (
          <p className="info">Não foi possível encontrar seu produto...</p>
        )}
      </ul>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <nav>
          <ul id={styles.paginacao}>
            <li
              className="btn small_width"
              onClick={() => paginaAtual > 1 && setPaginaAtual(1)}
              style={{
                opacity: paginaAtual === 1 ? 0.25 : 1,
                cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
              }}
            >
              {"<<"}
            </li>
            <li
              className="btn small_width"
              onClick={() => paginaAtual > 1 && setPaginaAtual(paginaAtual - 1)}
              style={{
                opacity: paginaAtual === 1 ? 0.35 : 1,
                cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
              }}
            >
              {"<"}
            </li>
            {paginasVisiveis.map((pagina) => (
              <li
                key={`pag-${pagina}`}
                onClick={() => setPaginaAtual(pagina)}
                className={`${paginaAtual === pagina ? "btn" : "btn2"} small_width`}
              >
                {pagina}
              </li>
            ))}
            <li
              className="btn small_width"
              onClick={() =>
                paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1)
              }
              style={{
                opacity: paginaAtual === totalPaginas ? 0.35 : 1,
                cursor:
                  paginaAtual === totalPaginas ? "not-allowed" : "pointer",
              }}
            >
              {">"}
            </li>
            <li
              className="btn small_width"
              onClick={() =>
                paginaAtual < totalPaginas && setPaginaAtual(totalPaginas)
              }
              style={{
                opacity: paginaAtual === totalPaginas ? 0.25 : 1,
                cursor:
                  paginaAtual === totalPaginas ? "not-allowed" : "pointer",
              }}
            >
              {">>"}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Lista;
