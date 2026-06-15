import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Lucide from "@/utils/lucide";
import styles from "./cProduto.module.css";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import Link from "next/link";

type Produto = {
  produtoID: number;
  nome: string;
  preco: string;
};

// --- CONFIGURAÇÕES DOS SELECTS CUSTOMIZADOS ---
const CONFIG_SELECTS = {
  tipo: {
    label: "Tipo",
    icone: "Type" as const,
    opcoes: [
      { value: "1", label: "Tipo 1" },
      { value: "2", label: "Tipo 2" },
    ],
  },
  categoria: {
    label: "Categoria",
    icone: "Grid2X2" as const,
    opcoes: [
      { value: "1", label: "Categoria 1" },
      { value: "2", label: "Categoria 2" },
    ],
  },
  localizacao: {
    label: "Localização",
    icone: "MapPin" as const,
    opcoes: [
      { value: "1", label: "Localização 1" },
      { value: "2", label: "Localização 2" },
    ],
  },
  usuario: {
    label: "Usuário",
    icone: "User" as const,
    opcoes: [
      { value: "1", label: "Usuário 1" },
      { value: "2", label: "Usuário 2" },
    ],
  },
  tamanho: {
    label: "Tamanho",
    icone: "RulerDimensionLine" as const,
    opcoes: [
      { value: "1", label: "Tamanho 1" },
      { value: "2", label: "Tamanho 2" },
    ],
  },
};

const CadastroProduto = () => {
  const [preview, setPreview] = useState<string | null>(null);

  // Estados dos valores selecionados (simulando o select nativo)
  const [valoresSelect, setValoresSelect] = useState<Record<string, string>>({
    tipo: "",
    categoria: "",
    localizacao: "",
    usuario: "",
    tamanho: "",
  });

  // Estado para controlar qual select está aberto no momento
  const [selectAberto, setSelectAberto] = useState<Record<string, boolean>>({
    tipo: false,
    categoria: false,
    localizacao: false,
    usuario: false,
    tamanho: false,
  });

  // Referência do formulário para fechar qualquer select aberto ao clicar fora
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagemUrl = URL.createObjectURL(file);
      setPreview(imagemUrl);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Hook para fechar os selects ao clicar fora deles
  useEffect(() => {
    const fecharAoClicarFora = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setSelectAberto({
          tipo: false,
          categoria: false,
          localizacao: false,
          usuario: false,
          tamanho: false,
        });
      }
    };

    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  // Alterna a abertura de um select específico e fecha os demais
  const alternarSelect = (campo: string) => {
    setSelectAberto((prev) => ({
      tipo: campo === "tipo" ? !prev.tipo : false,
      categoria: campo === "categoria" ? !prev.categoria : false,
      localizacao: campo === "localizacao" ? !prev.localizacao : false,
      usuario: campo === "usuario" ? !prev.usuario : false,
      tamanho: campo === "tamanho" ? !prev.tamanho : false,
    }));
  };

  // Trata a seleção da opção do dropdown
  const handleSelecionarOpcao = (campo: string, valor: string) => {
    setValoresSelect((prev) => ({ ...prev, [campo]: valor }));
    setSelectAberto((prev) => ({ ...prev, [campo]: false }));
  };

  // Função auxiliar para renderizar cada select customizado repetindo o padrão
  const renderSelectCustomizado = (campo: keyof typeof CONFIG_SELECTS) => {
    const config = CONFIG_SELECTS[campo];
    const valorAtual = valoresSelect[campo];
    const aberto = selectAberto[campo];
    
    // Encontra a label correspondente ao valor selecionado atualmente
    const labelExibida = config.opcoes.find(o => o.value === valorAtual)?.label || "";

    return (
      <div className={`campo_select ${aberto ? "open" : ""} ${valorAtual ? "has-value" : ""}`}>
        <Lucide
          name={config.icone}
          className="lucide rotate"
          style={{
            transition: "transform 0.2s ease",
            transform: aberto ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
          }}
        />

        <div
          className="select"
          tabIndex={0}
          onClick={() => alternarSelect(campo)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            paddingLeft: "50px",
          }}
        >
          <span>{labelExibida}</span>
        </div>

        <label className="label">{config.label}</label>

        {aberto && (
          <ul className="dropdown_options" style={{ display: "block" }}>
            <li onClick={() => handleSelecionarOpcao(campo, "")}>
              <Lucide name="RectangleEllipsis" className="reset_lucide" />
              Nenhum
            </li>
            {config.opcoes.map((opcao) => (
              <li key={opcao.value} onClick={() => handleSelecionarOpcao(campo, opcao.value)}>
                {opcao.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column">
          <form className="form grid info" ref={formRef}>
            <div className="column full_height">
              <div className="campo_form">
                <label htmlFor="upload-foto" className="input_upload">
                  {preview ? (
                    <div className="relative_pos full_size_preview">
                      <img src={preview} alt="Preview" className="preview_img" />
                      <button type="button" onClick={handleRemoveImage} className="btn_delete">
                        X
                      </button>
                    </div>
                  ) : (
                    <>
                      <Lucide name="Upload" size={24} className="upload_lucide" />
                      <span>Escolher Imagem</span>
                    </>
                  )}
                </label>
                <input
                  id="upload-foto"
                  type="file"
                  accept="image/*"
                  className="input_img"
                  onChange={handleFileChange}
                />
              </div>
              <div className="campo_form">
                <Lucide name="RectangleEllipsis" className="lucide" />
                <input type="text" id="codigo" placeholder=" " className="input small" required />
                <label htmlFor="codigo" className="label">
                  Código
                </label>
              </div>
            </div>

            <div className="column full_height">
              <div className="campo_form">
                <Lucide name="ALargeSmall" className="lucide" />
                <input type="text" id="titulo" placeholder=" " className="input" required />
                <label htmlFor="titulo" className="label">
                  Título
                </label>
              </div>
              <div className="campo_form">
                <Lucide name="Tag" className="lucide" />
                <input type="text" id="preco" placeholder=" " className="input" required />
                <label htmlFor="preco" className="label">
                  Preço
                </label>
              </div>
              <div className="campo_form">
                <Lucide name="MessageSquareText" className="lucide desc_lucide" />
                <textarea id="descricao" placeholder=" " className="textarea" required />
                <label htmlFor="descricao" className="label">
                  Descrição
                </label>
              </div>
            </div>

            {/* Terceira coluna contendo todos os selects dinâmicos */}
            <div className="column full_height">
              {renderSelectCustomizado("tipo")}
              {renderSelectCustomizado("categoria")}
              {renderSelectCustomizado("localizacao")}
              {renderSelectCustomizado("usuario")}
              {renderSelectCustomizado("tamanho")}
            </div>
          </form>

          <div className="row">
            <Link href="/home" className="btn2">
              Voltar
            </Link>
            <Button id={styles.button} children="Salvar" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CadastroProduto;