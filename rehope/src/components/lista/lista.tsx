import { useEffect, useState } from "react";
import styles from "./lista.module.css";
import Card from "@/components/cards/cards";
import Lucide from "@/utils/lucide";
import { useParams } from "next/navigation";
import { listar, listarPorId } from "@/pages/api/mockService";
import { erro } from "@/utils/toast";

type Produto = {
  produtoID: number;
  nome: string;
  preco: string;
};

const Lista = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenacao, setOrdenacao] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [produto, setProduto] = useState<Produto[]>([]);
  
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    listarJogo();
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

  //? Auxiliar para converter "R$ 149,90" em float (149.90) para o sort funcionar
  const converterPreco = (precoStr: string): number => {
    return parseFloat(precoStr.replace("R$ ", "").replace(".", "").replace(",", "."));
  };

  //? Filtro de Pesquisa
  const produtosFiltrados = produto.filter((p) =>
    p.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  //? Ordenação
  const produtosOrdenados = [...produtosFiltrados];

  if (ordenacao === "menor") {
    produtosOrdenados.sort((a, b) => converterPreco(a.preco) - converterPreco(b.preco));
  }

  if (ordenacao === "maior") {
    produtosOrdenados.sort((a, b) => converterPreco(b.preco) - converterPreco(a.preco));
  }

  if (ordenacao === "alfabetica") {
    produtosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  if (ordenacao === "alfabetica-contraria") {
    produtosOrdenados.sort((a, b) => b.nome.localeCompare(a.nome));
  }

  //? Paginação
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

  return (
    <section>
      <div className="row sbs" id={styles.filtros}>
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
        <div className="campo_select">
          <Lucide name="Filter" className="lucide" />
          <select
            name="filtro"
            id="filtro"
            className="select"
            value={ordenacao}
            onChange={(e) => {
              setOrdenacao(e.target.value);
              setPaginaAtual(1);
            }}
            required
          >
            <option value=""></option>
            <option value="menor">Menor Preço</option>
            <option value="maior">Maior Preço</option>
            <option value="alfabetica">A-Z</option>
            <option value="alfabetica-contraria">Z-A</option>
          </select>
          <label htmlFor="filtro" className="label">
            Filtrar
          </label>
        </div>
      </div>

      <ul className="row">
        {cardsExibidos.map((item, index) => (
          <Card
            key={item?.produtoID ?? `fantasma-${index}`}
            fantasma={!item}
            {...(item || {})}
          />
        ))}
      </ul>

      {totalPaginas > 1 && (
        <nav>
          <ul id={styles.paginacao}>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <li
                key={index + 1}
                onClick={() => setPaginaAtual(index + 1)}
                className={`btn ${paginaAtual === index + 1 ? styles.ativo : ""}`}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
};

export default Lista;