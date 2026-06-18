import { useEffect, useState } from "react";

type TrocaTemaProps = {
  className?: string;
};

export function TrocaTema({ className }: TrocaTemaProps) {
  const [isDark, setIsDark] = useState(false);

  // 1. Carrega o tema salvo assim que o componente é montado
  useEffect(() => {
    const root = document.documentElement;
    const temaSalvo = localStorage.getItem("theme");

    // Verifica se há tema salvo OU se o sistema do usuário prefere darkmode
    const prefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (temaSalvo === "dark" || (!temaSalvo && prefereDark)) {
      root.classList.add("darkmode");
      setIsDark(true);
    } else {
      root.classList.remove("darkmode");
      setIsDark(false);
    }
  }, []);

  // 2. Alterna o tema ao clicar
  const trocaTema = () => {
    const root = document.documentElement;

    if (root.classList.contains("darkmode")) {
      root.classList.remove("darkmode");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("darkmode");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button onClick={trocaTema} className={className} aria-label="Alternar tema">
      {isDark ? (
        <svg
          className="iconLua"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lua */}
          <path
            d="M45.0615 5.27051C45.4835 22.5338 48.195 35.2654 56.4648 43.5352C64.7345 51.8048 77.4658 54.5154 94.7285 54.9375C92.2696 77.4672 73.1841 95 50 95C25.1472 95 5 74.8528 5 50C5 26.8162 22.5323 7.72985 45.0615 5.27051Z"
            stroke="currentColor"
            strokeWidth="10"
          />
        </svg>
      ) : (
        <svg
          className="iconSol"
          width="168"
          height="168"
          viewBox="0 0 168 168"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sol */}
          <path d="M84 140C86.7614 140 89 142.239 89 145V163C89 165.761 86.7614 168 84 168C81.2386 168 79 165.761 79 163V145C79 142.239 81.2386 140 84 140Z" className="path" fill="currentColor"/>
          <path d="M37.3311 123.598C39.2837 121.645 42.4498 121.645 44.4023 123.598C46.3549 125.55 46.3548 128.716 44.4023 130.669L31.6738 143.396C29.7212 145.349 26.5552 145.349 24.6025 143.396C22.6505 141.444 22.6505 138.279 24.6025 136.326L37.3311 123.598Z" className="path" fill="currentColor"/>
          <path d="M123.598 123.598C125.55 121.645 128.716 121.645 130.669 123.598L143.397 136.326C145.35 138.279 145.35 141.445 143.397 143.397C141.445 145.35 138.279 145.35 136.326 143.397L123.598 130.669C121.645 128.716 121.645 125.55 123.598 123.598Z" className="path" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M84 34C111.614 34 134 56.3858 134 84C134 111.614 111.614 134 84 134C56.3858 134 34 111.614 34 84C34 56.3858 56.3858 34 84 34ZM84 44C61.9086 44 44 61.9086 44 84C44 106.091 61.9086 124 84 124C106.091 124 124 106.091 124 84C124 61.9086 106.091 44 84 44Z" className="path" fill="currentColor"/>
          <path d="M23 79C25.7614 79 28 81.2386 28 84C28 86.7614 25.7614 89 23 89H5C2.23858 89 -3.29296e-08 86.7614 0 84C3.29296e-08 81.2386 2.23858 79 5 79H23Z" className="path" fill="currentColor"/>
          <path d="M163 79C165.761 79 168 81.2386 168 84C168 86.7614 165.761 89 163 89H145C142.239 89 140 86.7614 140 84C140 81.2386 142.239 79 145 79H163Z" className="path" fill="currentColor"/>
          <path d="M24.6035 24.6025C26.556 22.6505 29.7213 22.6505 31.6738 24.6025L44.4023 37.3311C46.3548 39.2837 46.3549 42.4498 44.4023 44.4023C42.4498 46.3549 39.2837 46.3547 37.3311 44.4023L24.6035 31.6738C22.6509 29.7212 22.6509 26.5552 24.6035 24.6025Z" className="path" fill="currentColor"/>
          <path d="M136.326 24.6035C138.279 22.6509 141.445 22.6509 143.397 24.6035C145.349 26.556 145.35 29.7213 143.397 31.6738L130.669 44.4023C128.716 46.3548 125.55 46.3549 123.598 44.4023C121.645 42.4498 121.645 39.2837 123.598 37.3311L136.326 24.6035Z" className="path" fill="currentColor"/>
          <path d="M84 0C86.7614 0 89 2.23858 89 5V23C89 25.7614 86.7614 28 84 28C81.2386 28 79 25.7614 79 23V5C79 2.23858 81.2386 0 84 0Z" className="path" fill="currentColor"/>
        </svg>
      )}
    </button>
  );
}