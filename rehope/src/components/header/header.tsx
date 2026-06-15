import Link from "next/link";
import styles from "./header.module.css";
import Button from "@/components/button/button";
import { useRouter } from "next/router";
import { logout } from "@/pages/api/authService";
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
            <p className="branco">
              <span>+</span> Categoria
            </p>
          </Link>

          <Link className="link" href="/cProduto">
            <p className="branco">
              <span>+</span> Produto
            </p>
          </Link>

          <Link className="link" href="/cUsuario">
            <p className="branco">
              <span>+</span> Usuário
            </p>
          </Link>
          <div className="row">
            <img
              className="img"
              id={styles.img_usuario}
              src="/imgs/CardFantasma.png"
              alt=""
            />
            <div className="column">
              <h4 className="h4 branco">Nome</h4>
              <p className="p branco">Email</p>
            </div>
          </div>
          {/* <Button children="Logout" onClick={() => logout()} /> */}
          <TrocaTema />
        </div>
      </div>
    </header>
  );
};

export default Header;
