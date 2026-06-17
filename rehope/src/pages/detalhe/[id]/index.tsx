import Footer from "@/components/footer/footer";
import Button from "@/components/button/button";
import Header from "@/components/header/header";
import styles from "./detalhe.module.css";
import { erro } from "@/utils/toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Lucide from "@/utils/lucide";
import { listarPorId } from "@/pages/api/mockService";

type Produto = {
  produtoID: number;
  codigo: string;
  nome: string;
  preco: string;
  status: boolean;
  descricao: string;
  tipo: string;
  categoria: string;
  localizacao: string;
  tamanho: string;
  usuario: string;
};

const Detalhe = () => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const params = useParams();
  const id = params?.id;

  async function listarJogo() {
    try {
      const response = await listarPorId(Number(id));
      setProduto(response);
    } catch (error: any) {
      erro(error.message);
    }
  }

  useEffect(() => {
    if (!id) return;
    listarJogo();
  }, [id]);

  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column">
          <article className="grid info">
            <div className="column start">
              <div className={styles.imgContainer}>
                <img
                  id={styles.img}
                  src="../imgs/ImagemDoLogin.png"
                  alt=""
                  className={`img small_radius ${
                    produto?.status ? styles.ativoImg : styles.inativoImg
                  }`}
                />

                <h3 className={produto?.status ? styles.ativoH3 : styles.inativoH3}>
                  {produto?.status ? "Ativo" : "Inativo"}
                </h3>
              </div>
              <div className="row">
                <h4>Código:</h4>
                <p>{produto?.codigo}</p>
              </div>
            </div>
            <div className="column start" id={styles.espacamento1}>
              <h1>{produto?.nome}</h1>
              <h3>{produto?.preco}</h3>
              <p>{produto?.descricao}</p>
            </div>
            <div className="column start" id={styles.espacamento2}>
              <div className="row">
                <Lucide name="Type" className="reset_lucide" />
                <div>
                  <h3>Tipo:</h3>
                  <p>{produto?.tipo}</p>
                </div>
              </div>
              <div className="row">
                <Lucide name="Grid2X2" className="reset_lucide" />
                <div>
                  <h3>Categoria:</h3>
                  <p>{produto?.categoria}</p>
                </div>
              </div>
              <div className="row">
                <Lucide name="MapPin" className="reset_lucide" />
                <div>
                  <h3>Localização:</h3>
                  <p>{produto?.localizacao}</p>
                </div>
              </div>
              <div className="row">
                <Lucide name="RulerDimensionLine" className="reset_lucide" />
                <div>
                  <h3>Tamanho:</h3>
                  <p>{produto?.tamanho}</p>
                </div>
              </div>
              <div className="row">
                <Lucide name="User" className="reset_lucide" />
                <div>
                  <h3>Usuário:</h3>
                  <p>{produto?.usuario}</p>
                </div>
              </div>
            </div>
          </article>
          <div className="row">
            <Link href="/home" className="btn2">
              Voltar
            </Link>
            <Button id={styles.button} children="Editar" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Detalhe;