import { useState } from "react";
import styles from "./lista.module.css";
import Card from "@/components/cards/cards";
import Lucide from "@/utils/lucide";

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
    { id: 1, nome: "A", preco: 100 },
    { id: 2, nome: "Z", preco: 90 },
    { id: 3, nome: "B", preco: 80 },
    { id: 4, nome: "Y", preco: 70 },
    { id: 5, nome: "C", preco: 60 },
    { id: 6, nome: "X", preco: 50 },
  ]);

  const itensPorPagina = 3;

  //? Pesquisa
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase()),
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

  if (ordenacao === "alfabetica-contraria") {
    produtosOrdenados.sort((b, a) => a.nome.localeCompare(b.nome));
  }
  

  //? Paginação
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;

  const produtosPaginados = produtosOrdenados.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(produtosOrdenados.length / itensPorPagina);

  return (
    <section>
      <div className={styles.filtros}>
        <div className="campo_form">
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
            <Lucide name="Search" />
            Pesquise seu produto...
          </label>
        </div>
        <div className="campo_select">
          <select
            name="filtro"
            id="filtro"
            className="select"
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
        {produtosPaginados.map((produto) => (
          <Card
            key={produto.id}
            id={produto.id}
            nome={produto.nome}
            preco={produto.preco}
          />
        ))}
      </ul>

      <nav className={styles.navegacao}>
        <ul>
          {Array.from({ length: totalPaginas }, (_, index) => (
            <li
              key={index + 1}
              onClick={() => setPaginaAtual(index + 1)}
              className={paginaAtual === index + 1 ? styles.ativo : ""}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default Lista;
