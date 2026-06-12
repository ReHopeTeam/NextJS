import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import styles from "./detalhe.module.css";
import { listarPorId } from "@/pages/api/mockService";
import { erro } from "@/utils/toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Lucide from "@/utils/lucide";

type Produto = {
  produtoID: number;
  codigo: string;
  nome: string;
  preço: string;
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
              <img
                id={styles.img}
                src="../imgs/ImagemDoLogin.png"
                alt=""
                className="img small_radius"
              />
              <div className="row">
                <h4>Código:</h4>
                <p>{produto?.codigo}</p>
              </div>
              <div>
                {produto?.status ? (
                  <h3 className="ativo">Ativo</h3>
                ) : (
                  <h3 className="inativo">Inativo</h3>
                )}
              </div>
            </div>
            <div className="column start">
              <h1>{produto?.nome}</h1>
              <h3>{produto?.preço}</h3>
              <p>{produto?.descricao}</p>
            </div>
            <div className="column start">
              <div>
                <h3>Tipo:</h3>
                <p>{produto?.tipo}</p>
              </div>
              <div>
                <h3>Categoria:</h3>
                <p>{produto?.categoria}</p>
              </div>
              <div>
                <h3>Localização:</h3>
                <p>{produto?.localizacao}</p>
              </div>
              <div className="row">
                <Lucide name="RulerDimensionLine" />
                <div>
                  <h3>Tamanho:</h3>
                  <p>{produto?.tamanho}</p>
                </div>
              </div>
              <div>
                <h3>Usuário:</h3>
                <p>{produto?.usuario}</p>
              </div>
            </div>
          </article>
          <Link href="/home" className="btn2">
            Voltar
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Detalhe;
