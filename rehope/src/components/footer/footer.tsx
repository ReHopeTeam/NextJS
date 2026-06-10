import Link from "next/link";
import styles from "./footer.module.css";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <footer id={styles.footer}>
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
				{/* <div> do botão que redireciona para a home */}
				<div>
					
				</div>
			</div>
		</footer>
  );
};

export default Footer;
