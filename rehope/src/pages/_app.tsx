import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand, Comfortaa } from "next/font/google";
import { useEffect } from "react";
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
  useEffect(() => {
    // 1. Verifica se o usuário já salvou uma preferência antes
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Se não houver salvo, verifica a preferência do sistema operacional
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const root = document.documentElement; // Captura a tag <html>

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      root.classList.add('darkmode');
    } else {
      root.classList.remove('darkmode');
    }
  }, []);

  return (
    <main className={`${quicksand.variable} ${comfortaa.variable}`}>
      <ToastContainer />
      <Component {...pageProps} />
    </main>
  );
}
