import Link from "next/link";
import styles from "./cards.module.css";
import Button from "@/components/button/button";
import Lucide from "@/utils/lucide";

type CardProps = {
  produtoID: number;
  nome?: string;
  preco?: string;
  imagem?: string;
  fantasma?: boolean;
};

const Card = ({
  produtoID,
  nome,
  preco,
  imagem,
  fantasma = false,
}: CardProps) => {
  return (
    <article className="column">
      <li
        id={!fantasma ? styles.card : undefined}
        className={fantasma ? styles.cardFantasma : ""}
      >
        {fantasma ? (
          <>
            <div>
              <img
                className="img"
                id={styles.img}
                src="/imgs/CardFantasma.png"
                alt="Produto fantasma segurando lugar para o produto real"
              />
              <span className="title dark">⟬ ??? ⟭</span>
            </div>

            <h3 className="title"></h3>

            <div className="row no_gap to_column" id={styles.botoes}>
              <Button className={`${styles.btn_card} ${styles.excluir}`}>
                <Lucide className="reset_lucide" name="Delete" />
                <p className="p white">Excluir</p>
              </Button>

              <Link href="/login" className={`${styles.btn_card} ${styles.editar}`}>
                <Lucide className="reset_lucide" name="SquarePen" />
                <p className="p white">Editar</p>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link href={`/detalhe/${produtoID}`}>
                <img
                  className="img"
                  id={styles.img}
                  src={imagem || "/imgs/ImagemDoLogin.png"}
                  alt={nome}
                />
              </Link>
              <span className="title dark">{nome}</span>
            </div>

            <h3 className="title">{preco}</h3>

            <div className="row no_gap to_column">
              <Button className={`${styles.btn_card} ${styles.excluir}`}>
                <Lucide className="reset_lucide icon_branco" name="Delete" />
                <p className="p white">Excluir</p>
              </Button>

              <Link href={`/cProduto?id=${produtoID}`} className={`${styles.btn_card} ${styles.editar}`}>
                <Lucide className="reset_lucide icon_branco" name="SquarePen" />
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
