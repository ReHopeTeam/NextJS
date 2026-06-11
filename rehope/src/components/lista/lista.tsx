import { useState } from "react";
import styles from "./lista.module.css";
import Card from "@/components/cards/cards";

type Produto = {
  id: number;
  nome: string;
  preco: number;
};

const Lista = () => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenacao, setOrdenacao] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  //? Dados temporários até integrar a API
  const [produtos] = useState<Produto[]>([
    { id: 1, nome: "Placeholder1", preco: 100 },
    { id: 2, nome: "Placeholder2", preco: 100 },
    { id: 3, nome: "Placeholder3", preco: 100 },
    { id: 4, nome: "Placeholder4", preco: 100 },
    { id: 5, nome: "Placeholder5", preco: 100 },
    { id: 6, nome: "Placeholder6", preco: 100 },
  ]);

  const itensPorPagina = 3;

  //? Pesquisa
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  //? Ordenação
  const produtosOrdenados = [...produtosFiltrados];

  if (ordenacao === "menor") {
    produtosOrdenados.sort((a, b) => a.preco - b.preco);
  }

  if (ordenacao === "maior") {
    produtosOrdenados.sort((a, b) => b.preco - a.preco);
  }

  if (ordenacao === "alfabetica") {
    produtosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  //? Paginação
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;

  const produtosPaginados = produtosOrdenados.slice(
    indiceInicial,
    indiceFinal
  );

  const totalPaginas = Math.ceil(
    produtosOrdenados.length / itensPorPagina
  );

  return (
    <section>
      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Pesquise..."
          value={pesquisa}
          onChange={(e) => {
            setPesquisa(e.target.value);
            setPaginaAtual(1);
          }}
        />

        <div className={styles.botoes}>
          <select
            value={ordenacao}
            onChange={(e) => {
              setOrdenacao(e.target.value);
              setPaginaAtual(1);
            }}
          >
            <option value="">Ordem Padrão</option>
            <option value="menor">Menor Preço</option>
            <option value="maior">Maior Preço</option>
            <option value="alfabetica">A-Z</option>
          </select>
        </div>
      </div>

      <ul className="row">
        {produtosPaginados.map((produto) => (
          <Card
            key={produto.id}
            nome={produto.nome}
            preco={produto.preco}
          />
        ))}
      </ul>

      <nav className={styles.navegacao}>
        <ul>
          {Array.from(
            { length: totalPaginas },
            (_, index) => (
              <li
                key={index + 1}
                onClick={() => setPaginaAtual(index + 1)}
                className={
                  paginaAtual === index + 1
                    ? styles.ativo
                    : ""
                }
              >
                {index + 1}
              </li>
            )
          )}
        </ul>
      </nav>
    </section>
  );
};

export default Lista;