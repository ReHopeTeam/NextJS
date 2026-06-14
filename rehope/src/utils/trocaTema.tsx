import { useEffect, useState } from 'react';

type TrocaTemaProps = {
  className?: string;
};

export function TrocaTema({ className }: TrocaTemaProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('darkmode'));
  }, []);

  const trocaTema = () => {
    const root = document.documentElement;
    
    if (root.classList.contains('darkmode')) {
      root.classList.remove('darkmode');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('darkmode');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button onClick={trocaTema} className={className}>
      <img
        src={`/imgs/${isDark ? 'Sol' : 'Lua'}.svg`}
        alt="Mudar o tema de cores"
        className={isDark ? "iconSol" : "iconLua"}
      />
    </button>
  );
}