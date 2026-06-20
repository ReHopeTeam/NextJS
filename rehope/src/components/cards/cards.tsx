import Link from "next/link";
import styles from "./cards.module.css";
import Button from "@/components/button/button";
import Lucide from "@/utils/lucide";
import { formatarPreco } from "@/utils/formatacao";

type CardProps = {
  produtoID: number;
  nomeProduto: string;
  preco: string;
  imagem: string | null | any; // 'any' temporário para evitar quebra caso o Pai mande errado
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
  
  // Tratamento limpo sabendo como a sua API C# funciona
  const srcImagemReal = (() => {
    // 1. Se não houver imagem (null, undefined ou vazio), usa a padrão
    if (!imagem) return "/imgs/ImagemDoLogin.png";

    // 2. Se o componente Pai passou o objeto inteiro do produto por engano
    if (typeof imagem === "object") return "/imgs/ImagemDoLogin.png";

    // 3. Se for uma string válida
    if (typeof imagem === "string") {
      // Se já for link ou já tiver base64 formatado
      if (imagem.startsWith("http") || imagem.startsWith("/")) return imagem;
      if (imagem.startsWith("data:") || imagem.includes("base64,")) return imagem;

      // Como a sua API em C# retorna a Base64 crua, nós adicionamos o prefixo aqui:
      return `data:image/jpeg;base64,${imagem}`;
    }

    return "/imgs/ImagemDoLogin.png";
  })();

  const config = {
    id: !fantasma ? styles.card : undefined,
    className: fantasma ? styles.cardFantasma : "",
    imagemSrc: fantasma ? "/imgs/CardFantasma.png" : srcImagemReal,
    imagemAlt: fantasma ? "Produto fantasma" : nomeProduto,
    titulo: fantasma ? "Preço" : formatarPreco(Number(preco)),
    tag: fantasma ? "CircleQuestionMark" : undefined,
    linkEditar: fantasma ? "/login" : `/cProduto?id=${produtoID}`,
    onExcluir: fantasma ? undefined : () => onDelete(produtoID),
  };

  return (
    <article className="column">
      <li id={config.id} className={config.className}>
        <div className={`${styles.imagemContainer} fit_content`}>
          {!fantasma ? (
            <Link href={`/detalhe/${produtoID}`}>
              <img className="img" id={styles.img} src={config.imagemSrc} alt={config.imagemAlt} />
            </Link>
          ) : (
            <img className="img" id={styles.img} src={config.imagemSrc} alt={config.imagemAlt} />
          )}

          <span className={`${styles.tituloProduto} title dark`}>
            {fantasma ? (
              <>
                <Lucide name="CircleQuestionMark" className="reset_lucide" />
                <Lucide name="CircleQuestionMark" className="reset_lucide" />
                <Lucide name="CircleQuestionMark" className="reset_lucide" />
              </>
            ) : (
              nomeProduto
            )}
          </span>
        </div>

        <h3 className="title">{config.titulo}</h3>

        <div className={`row no_gap to_column2 ${styles.botoes}`} id={fantasma ? styles.botoes : undefined}>
          <Button 
            className={`${styles.btn_card} ${styles.excluir}`} 
            onClick={config.onExcluir}
          >
            <Lucide name="Delete" className="reset_lucide icon_branco" />
            <p className="p white">Excluir</p>
          </Button>

          <Link
            href={config.linkEditar}
            className={`btn ${styles.btn_card} ${styles.editar}`}
          >
            <Lucide name="SquarePen" className="reset_lucide icon_branco" />
            <p className="p white">Editar</p>
          </Link>
        </div>
      </li>
    </article>
  );
};

export default Card;