import Link from "next/link";
import styles from "./header.module.css";
import { useRouter } from "next/router";
import { TrocaTema } from "@/utils/trocaTema";
import { useEffect, useState } from "react";
import { logout, obterUsuarioAutenticado } from "@/pages/api/authService";
import Button from "../button/button";

interface Token {
  id: string;
  nome: string;
  email: string;
}

const Header = () => {
  const [usuario, setUsuario] = useState<Token | null>(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const router = useRouter();

  useEffect(() => {
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

  return (
    <header id={styles.header} className="main_header">
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
          <Link className="row no_gap link" href="/cCategoria">
            <span>+</span> <p className="white">Categoria</p>
          </Link>

          <Link className="row no_gap link" href="/cProduto">
            <span>+</span> <p className="white">Produto</p>
          </Link>

          <Link className="row no_gap link" href="/cUsuario">
            <span>+</span> <p className="white">Usuário</p>
          </Link>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
