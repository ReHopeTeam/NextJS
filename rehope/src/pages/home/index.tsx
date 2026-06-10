import styles from "./home.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Button from "@/components/button/button";
import { erro, notificacao } from "@/utils/toast";

const Home = () => {
  return (
    <>
      <Header />
      <main className="min_height">
        <Button children="Teste" onClick={() => notificacao("Teste")}/>
        <Button children="Teste" onClick={() => erro("Teste")}/>
      </main>
      <Footer />
    </>
  );
};

export default Home;
