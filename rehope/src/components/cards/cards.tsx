import Link from "next/link";
import styles from "./cards.module.css";
import Button from "@/components/button/button";
import Lucide from "@/utils/lucide";

type CardProps = {
  id: number;
  nome: string;
  preco: string;
  imagem?: string;
};

const Card = ({ id, nome, preco, imagem }: CardProps) => {
  return (
    <article className="column">
      <li id={styles.card}>
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
      </li>
    </article>
  );
};

export default Card;