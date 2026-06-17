import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand, Comfortaa } from "next/font/google";
import { useRouter } from "next/router"; // 1. Importado o useRouter
import { useEffect, useRef } from "react"; // 2. Adicionado o useRef
import { ToastContainer } from "react-toastify";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter(); // 3. Inicializado o roteador

  // 4. Referência para controlar a pausa/play da navegação
  const resumeNavigationRef = useRef<() => void>(null);

  // SEU EFFECT ATUAL: Cuida do Tema Escuro
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const root = document.documentElement;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      root.classList.add("darkmode");
    } else {
      root.classList.remove("darkmode");
    }
  }, []);

  // NOVO EFFECT: Cuida da View Transition entre as telas
  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (!document.startViewTransition) return;

      // Cria a promessa que segura a renderização visual da nova tela
      const transitionPromise = new Promise<void>((resolve) => {
        resumeNavigationRef.current = resolve;
      });

      document.startViewTransition(() => transitionPromise);
    };

    const handleRouteChangeComplete = () => {
      if (resumeNavigationRef.current) {
        // Libera a promessa assim que o Next terminar de carregar os arquivos da nova página
        resumeNavigationRef.current();
        resumeNavigationRef.current = null;
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <main className={`${quicksand.variable} ${comfortaa.variable}`}>
      <ToastContainer />
      <Component {...pageProps} />
    </main>
  );
}
