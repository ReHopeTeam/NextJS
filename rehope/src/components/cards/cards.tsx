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
        <Link href={`/produto/${id}`}>
          <img
            className="img"
            id={styles.img}
            src={imagem || "/imgs/ImagemDoLogin.png"}
            alt={nome}
          />
        </Link>

        <span>{nome}</span>

        <p>
          {preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <div className="row">
          <Button children="Editar" />
          <Button children="Excluir" />
        </div>
      </li>
    </article>
  );
};

export default Card;