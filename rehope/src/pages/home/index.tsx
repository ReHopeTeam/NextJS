import { Fragment } from "react/jsx-runtime";
import styles from "./home.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const Home = () => {
    return (
        <Fragment>
            <Header />
            <main className="min_height">
            </main>
            <Footer />
        </Fragment>
    )
}

export default Home;