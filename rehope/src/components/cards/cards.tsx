import Link from "next/link";
import styles from "./cards.module.css";
import Button from "@/components/button/button";
import Lucide from "@/utils/lucide";
import { formatarPreco } from "@/utils/formatacao";

type CardProps = {
  produtoID: number;
  nomeProduto: string;
  preco: string;
  imagem: string | null;
  fantasma?: boolean;
  onDelete: (produtoId: number) => void;
};

const Card = ({
  produtoID,
  nomeProduto,
  preco,
  imagem,
  fantasma = false,
  onDelete,
}: CardProps) => {
  return (
    <article className="column">
      <li
        id={!fantasma ? styles.card : undefined}
        className={fantasma ? styles.cardFantasma : ""}
      >
        {fantasma ? (
          <>
            <div className="fit_content">
              <img
                className="img"
                id={styles.img}
                src="/imgs/CardFantasma.png"
                alt="Produto fantasma segurando lugar para o produto real"
              />
              <span className="title dark">
                <Lucide name="CircleQuestionMark" className="reset_lucide" />
              </span>
            </div>

            <h3 className="title">Preço</h3>

            <div className="row no_gap to_column" id={styles.botoes}>
              <Button className={`${styles.btn_card} ${styles.excluir}`}>
                <Lucide name="Delete" className="reset_lucide" />
                <p className="p white">Excluir</p>
              </Button>

              <Link
                href="/login"
                className={`${styles.btn_card} ${styles.editar}`}
              >
                <Lucide name="SquarePen" className="reset_lucide" />
                <p className="p white">Editar</p>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="fit_content">
              <Link href={`/detalhe/${produtoID}`}>
                <img
                  className="img"
                  id={styles.img}
                  src={
                    !imagem
                      ? "/imgs/ImagemDoLogin.png"
                      : imagem.startsWith("http") || imagem.startsWith("/")
                        ? imagem
                        : `data:image/jpeg;base64,${imagem}`
                  }
                  alt={nomeProduto}
                />
              </Link>
              <span className="title dark">{nomeProduto}</span>
            </div>

            <h3 className="title">{formatarPreco(Number(preco))}</h3>

            <div className="row no_gap to_column">
              <Button
                className={`${styles.btn_card} ${styles.excluir}`}
                onClick={() => onDelete(produtoID)}
              >
                <Lucide name="Delete" className="reset_lucide icon_branco" />
                <p className="p white">Excluir</p>
              </Button>

              <Link
                href={`/cProduto?id=${produtoID}`}
                className={`btn ${styles.btn_card} ${styles.editar}`}
              >
                <Lucide name="SquarePen" className="reset_lucide icon_branco" />
                <p className="p white">Editar</p>
              </Link>
            </div>
          </>
        )}
      </li>
    </article>
  );
};

export default Card;
