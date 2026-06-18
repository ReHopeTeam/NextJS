import Link from "next/link";
import styles from "./header.module.css";
import { useRouter } from "next/router";
import { TrocaTema } from "@/utils/trocaTema";
import { useEffect, useState } from "react";
import { logout, obterUsuarioAutenticado } from "@/pages/api/authService";
import Button from "../button/button";
import { createPortal } from "react-dom";
import Lucide from "@/utils/lucide";

interface Token {
  id: string;
  nome: string;
  email: string;
}

const Header = () => {
  const [usuario, setUsuario] = useState<Token | null>(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const dados = obterUsuarioAutenticado();

    if (dados) {
      setUsuario(dados);
      setEstaAutenticado(true);
    } else {
      setEstaAutenticado(false);
      setUsuario(null);
    }
  }, []);

  // Função para gerenciar o clique de logout de forma limpa
  const handleLogout = async () => {
    await logout();
    setUsuario(null);
    setEstaAutenticado(false);
    router.push("/login");
  };

  const menuLateral = (
    <>
      <div
        className={styles.overlay}
        onClick={() => setMenuAberto(false)}
      />

      <aside className={styles.sidebar}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setMenuAberto(false)}
        >
          <Lucide name="X" className="lucide" />
        </button>

        <Link
          href="/cCategoria"
          className={styles.menuLink}
        >
          Cadastrar Categoria
        </Link>

        <Link
          href="/cLocalizacao"
          className={styles.menuLink}
        >
          Cadastrar Localização
        </Link>

        <Link
          href="/cProduto"
          className={styles.menuLink}
        >
          Cadastrar Produto
        </Link>

        <Link
          href="/cTProduto"
          className={styles.menuLink}
        >
          Cadastrar Tipo
        </Link>

        <Link
          href="/cUsuario"
          className={styles.menuLink}
        >
          Cadastrar Usuário
        </Link>
        
        <Link
          href="/historico"
          className={styles.menuLink}
        >
          Histórico
        </Link>

        <Link
          href="/home"
          className={styles.menuLink}
        >
          Tela Inicial
        </Link>
      </aside>
    </>
  );

  return (
    <>
      <header id={styles.header} className="main_header">
        <div className="container row">
          {/* <div> do botão que redireciona para a home */}
          <div className="row">
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
            <div className="row">
              {usuario ? (
                <Button
                  className="column no_gap"
                  id={styles.user_info}
                  onClick={handleLogout}
                >
                  <h4 className="h4">{usuario.nome}</h4>
                  <p className="p">{usuario.email}</p>
                </Button>
              ) : (
                <Button
                  className="column no_gap"
                  id={styles.user_info}
                  onClick={handleLogout}
                >
                  <h4 className="h4">Nome</h4>
                  <p className="p">email@email.com</p>
                </Button>
              )}
            </div>
            <TrocaTema />
            <button
              type="button"
              className={styles.menuIcon}
              onClick={() => setMenuAberto(true)}
            >
              <Lucide name="Menu" className="lucide" />
            </button>
          </div>
        </div>
      </header>
      {mounted &&
        menuAberto &&
        createPortal(
          menuLateral,
          document.body
        )}
    </>
  );
};

export default Header;
