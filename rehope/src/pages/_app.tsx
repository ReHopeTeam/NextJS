import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand, Comfortaa } from "next/font/google";
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
  return (
    <main className={`${quicksand.variable} ${comfortaa.variable}`}>
      <ToastContainer />
      <Component {...pageProps} />
    </main>
  );
}
