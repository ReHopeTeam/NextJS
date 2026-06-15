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
        <div className="sbs">
        <TrocaTema />
          <a className="link" href="/">
            Placeholder1
          </a>
          <a className="link" href="">
            Placeholder2
          </a>
          <Button children="Logout" onClick={() => logout()}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
