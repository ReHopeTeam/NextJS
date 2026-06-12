import Link from "next/link";
import styles from "./cards.module.css";
import Button from "@/components/button/button";

type CardProps = {
  id: number;
  nome: string;
  preco: number;
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
          <span className="title">{nome}</span>
        </div>
        <p>
          {preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <div className="row no_gap" id={styles.botoes}>
          <Button children="Editar" className="btn_card" />
          <Button children="Excluir" className="btn_card" />
        </div>
      </li>
    </article>
  );
};

export default Card;
