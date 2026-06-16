import styles from "./home.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Lista from "@/components/lista/lista";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Header />
      <main className="min_height">
        <section id={styles.section}>
          <Lista />
          <Link href="/login" className="btn2">Login</Link>
          <Link href="/historico" className="btn2">Histórico</Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
