import styles from "./home.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Lista from "@/components/lista/lista";
import Button from "@/components/button/button";
import { erro, notificacao } from "@/utils/toast";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Header />
      <main className="min_height">
        <section>
          <Lista />
          <Link href="/login" className="btn2">Login</Link>
          <Link href="/cProduto" className="btn2">+ Produto</Link>
          <Link href="/cCategoria" className="btn2">+ Categoria</Link>
          <Link href="/detalhe" className="btn2">Detalhe</Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
