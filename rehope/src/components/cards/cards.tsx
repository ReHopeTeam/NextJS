import Link from "next/link";
import styles from "./cards.module.css";
import Button from "@/components/button/button";
import Lucide from "@/utils/lucide";

type CardProps = {
  id?: number;
  nome?: string;
  preco?: string;
  imagem?: string;
  fantasma?: boolean;
};

const Card = ({ id, nome, preco, imagem, fantasma = false, }: CardProps) => {

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

            <p className="title">R$ 00,00</p>

            <div className="row no_gap" id={styles.botoes}>
              <Button className={`${styles.btn_card} ${styles.editar}`}>
                <Lucide name="SquarePen" color="#fff" />
                Editar
              </Button>

              <Button className={`${styles.btn_card} ${styles.excluir}`}>
                <Lucide name="Delete" color="#fff" />
                Excluir
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link href={`/detalhe/${id}`}>
                <img
                  className="img"
                  id={styles.img}
                  src={imagem || "/imgs/ImagemDoLogin.png"}
                  alt={nome}
                />
              </Link>
              <span className="title dark">{nome}</span>
            </div>

            <p className="title">{preco}</p>

            <div className="row no_gap" id={styles.botoes}>
              <Button className={`${styles.btn_card} ${styles.editar}`}>
                <Lucide name="SquarePen" color="#fff" />
                Editar
              </Button>

              <Button className={`${styles.btn_card} ${styles.excluir}`}>
                <Lucide name="Delete" color="#fff" />
                Excluir
              </Button>
            </div>
          </>
        )}
      </li>
    </article>
  );
};

export default Card;