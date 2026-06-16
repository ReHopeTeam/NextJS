import Link from "next/link";
import styles from "./header.module.css";
import { useRouter } from "next/router";
import { TrocaTema } from "@/utils/trocaTema";

const Header = () => {
  const router = useRouter();

  return (
    <header id={styles.header}>
      <div className="container row">
        {/* <div> do botão que redireciona para a home */}
        <div>
          <Link href="/home">
            <img
              className="img"
              id={styles.img}
              src="/imgs/Logo.svg"
              alt="Logo do site"
            />
          </Link>
        </div>
        {/* "botões" na direita da página */}
        <div id={styles.div}>
          <Link className="link" href="/cCategoria">
            <span>+</span> Categoria
          </Link>

          <Link className="link" href="/cProduto">
            <span>+</span> Produto
          </Link>

          <Link className="link" href="/cUsuario">
            <span>+</span> Usuário
          </Link>
          <div className="row">
            <img
              className="img"
              id={styles.img_usuario}
              src="/imgs/CardFantasma.png"
              alt=""
            />
            <div className="column no_gap" id={styles.user_info}>
              <h4 className="h4">Convidado</h4>
              <p className="p">Email</p>
            </div>
          </div>
          <TrocaTema />
        </div>
      </div>
    </header>
  );
};

export default Header;
