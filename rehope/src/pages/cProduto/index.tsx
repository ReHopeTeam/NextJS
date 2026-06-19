import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Lucide from "@/utils/lucide";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { erro, notificacao } from "@/utils/toast";
import {
  cadastrarProduto,
  editarProduto,
  listarCategoria,
  listarLocalizacao,
  listarProdutoPorId,
  listarTipoProduto,
  listarUsuario,
  ProdutoForm,
} from "../api/genericService";
import { useRouter } from "next/router";

const API_BASE_URL = "http://localhost:7299";

// Configurações visuais fixas de cada select
const METADADOS_SELECTS = {
  tipo: { label: "Tipo", icone: "Package" as const },
  categoria: { label: "Categoria", icone: "Grid2X2" as const },
  localizacao: { label: "Localização", icone: "MapPin" as const },
  usuario: { label: "Usuário", icone: "User" as const },
};

const CadastroProduto = () => {
  const router = useRouter();
  const { id } = router.query;
  const telaEditar = !!id;

  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tamanho, setTamanho] = useState("");

  const [preview, setPreview] = useState<string | null>(null);
  const [arquivoImagem, setArquivoImagem] = useState<File | null>(null);

  // Estados para armazenar as listas dinâmicas que vêm da API
  const [listaTipos, setListaTipos] = useState<any[]>([]);
  const [listaCategorias, setListaCategorias] = useState<any[]>([]);
  const [listaLocalizacoes, setListaLocalizacoes] = useState<any[]>([]);
  const [listaUsuarios, setListaUsuarios] = useState<any[]>([]);

  const [valoresSelect, setValoresSelect] = useState<Record<string, string>>({
    tipo: "",
    categoria: "",
    localizacao: "",
    usuario: "",
  });

  const [selectAberto, setSelectAberto] = useState<Record<string, boolean>>({
    tipo: false,
    categoria: false,
    localizacao: false,
    usuario: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const renderizarPreview = (url: string | null) => {
    if (!url) return "";
    if (
      url.startsWith("blob:") ||
      url.startsWith("http://") ||
      url.startsWith("https://")
    ) {
      return url;
    }
    return `${API_BASE_URL}/${url.replace(/^\//, "")}`;
  };

  // Carrega os dados do produto caso seja tela de Edição
  async function carregarInformacoes() {
    if (!id) return;

    try {
      const produto = await listarProdutoPorId(id as string);

      setTitulo(produto.nomeProduto || "");
      setPreco(produto.preco || "");
      setDescricao(produto.descricao || "");
      setTamanho(produto.tamanho || "");

      setValoresSelect({
        tipo:
          produto.tipoProdutoID != null ? String(produto.tipoProdutoID) : "",
        categoria:
          produto.categoriaID != null ? String(produto.categoriaID) : "",
        localizacao:
          produto.localizacaoID != null ? String(produto.localizacaoID) : "",
        usuario: produto.usuarioID != null ? String(produto.usuarioID) : "",
      });

      if (produto.imagemUrl) {
        setPreview(produto.imagemUrl);
      }
    } catch (error) {
      erro("Erro ao carregar dados do produto");
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    if (telaEditar) {
      carregarInformacoes();
    }
  }, [router.isReady, id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArquivoImagem(file);
      const imagemUrl = URL.createObjectURL(file);
      setPreview(imagemUrl);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setArquivoImagem(null);
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Carrega todos os selects da API dinamicamente ao abrir a tela
  useEffect(() => {
    async function carregarCombos() {
      try {
        const [tipos, categorias, localizacoes, usuarios] = await Promise.all([
          listarTipoProduto().catch(() => []),
          listarCategoria().catch(() => []),
          listarLocalizacao().catch(() => []),
          listarUsuario().catch(() => []),
        ]);

        setListaTipos(Array.isArray(tipos) ? tipos : []);
        setListaCategorias(Array.isArray(categorias) ? categorias : []);
        setListaLocalizacoes(Array.isArray(localizacoes) ? localizacoes : []);
        setListaUsuarios(Array.isArray(usuarios) ? usuarios : []);
      } catch (err) {
        console.error("Erro ao carregar dados dos selects:", err);
      }
    }

    carregarCombos();
  }, []);

  useEffect(() => {
    const fecharAoClicarFora = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setSelectAberto({
          tipo: false,
          categoria: false,
          localizacao: false,
          usuario: false,
        });
      }
    };
    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  async function salvarProduto(e: React.FormEvent) {
    e.preventDefault();
    try {
      const dados: any = {
        nomeProduto: titulo,
        preco: preco,
        descricao: descricao,
        tamanho: tamanho,
        statusProduto: true,
        codigo: 0,
        categoriaID: Number(valoresSelect.categoria) || 0,
        localizacaoID: Number(valoresSelect.localizacao) || 0,
        usuarioID: valoresSelect.usuario,
        tipoProdutoID: Number(valoresSelect.tipo) || 0,
      };

      if (arquivoImagem) {
        dados.imagem = arquivoImagem;
      }

      if (
        !dados.categoriaID ||
        !dados.localizacaoID ||
        !dados.usuarioID ||
        !dados.tipoProdutoID
      ) {
        erro("Por favor, selecione todas as opções obrigatórias.");
        return;
      }

      if (telaEditar) {
        await editarProduto(String(id), dados);
        notificacao("Produto editado com sucesso!");
      } else {
        await cadastrarProduto(dados);
        notificacao("Produto cadastrado com sucesso!");
      }
      router.push("/home");
    } catch (error: any) {
      erro(error.message || "Erro ao salvar o produto.");
    }
  }

  const alternarSelect = (campo: string) => {
    setSelectAberto((prev) => ({
      tipo: campo === "tipo" ? !prev.tipo : false,
      categoria: campo === "categoria" ? !prev.categoria : false,
      localizacao: campo === "localizacao" ? !prev.localizacao : false,
      usuario: campo === "usuario" ? !prev.usuario : false,
    }));
  };

  const handleSelecionarOpcao = (campo: string, valor: string) => {
    setValoresSelect((prev) => ({ ...prev, [campo]: valor }));
    setSelectAberto((prev) => ({ ...prev, [campo]: false }));
  };

  // Renderizador dinâmico que mapeia as listas corretas vindas do backend
  const renderSelectCustomizado = (campo: keyof typeof METADADOS_SELECTS) => {
    const config = METADADOS_SELECTS[campo];
    const valorAtual = valoresSelect[campo];
    const aberto = selectAberto[campo];

    // Mapeia qual lista e quais propriedades usar para cada select baseado no contexto
    let listaAlvo: any[] = [];
    let extrairNome = (item: any) => "";
    let extrairId = (item: any) => "";

    if (campo === "tipo") {
      listaAlvo = listaTipos;
      extrairNome = (item) => item.nomeTipo || "";
      extrairId = (item) =>
        String(
          item.tipoId ?? item.tipoProdutoID ?? item.tipoProdutoId ?? item.id,
        );
    } else if (campo === "categoria") {
      listaAlvo = listaCategorias;
      extrairNome = (item) => item.nomeCategoria || "";
      extrairId = (item) =>
        String(item.categoriaId ?? item.categoriaID ?? item.id);
    } else if (campo === "localizacao") {
      listaAlvo = listaLocalizacoes;
      extrairNome = (item) => item.nomeLocalizacao || "";
      extrairId = (item) =>
        String(item.localizacaoId ?? item.localizacaoID ?? item.id);
    } else if (campo === "usuario") {
      listaAlvo = listaUsuarios;
      extrairNome = (item) => item.nome || item.nomeUsuario || "";
      extrairId = (item) => String(item.usuarioId ?? item.usuarioID ?? item.id);
    }

    // Busca dinamicamente a label que deve ser exibida na barra do select
    const labelExibida = listaAlvo.find(
      (item) => extrairId(item) === valorAtual,
    )
      ? extrairNome(listaAlvo.find((item) => extrairId(item) === valorAtual))
      : "";

    return (
      <div
        className={`campo_select ${aberto ? "open" : ""} ${valorAtual ? "has-value" : ""}`}
      >
        <Lucide
          name={config.icone}
          className="lucide rotate"
          style={{
            transition: "transform 0.2s ease",
            transform: aberto
              ? "translateY(-50%) rotate(180deg)"
              : "translateY(-50%)",
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
              <Lucide name="RectangleEllipsis" className="reset_lucide" />{" "}
              Nenhum
            </li>
            {listaAlvo.map((opcao, index) => {
              const idMapeado = extrairId(opcao);
              return (
                <li
                  key={`select-${campo}-${index}`}
                  onClick={() => handleSelecionarOpcao(campo, idMapeado)}
                >
                  {extrairNome(opcao)}
                </li>
              );
            })}
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
          <h1 className="title2">
            {telaEditar ? "Editar" : "Criar"} Produto
          </h1>

          <form
            className="form grid info"
            ref={formRef}
            onSubmit={salvarProduto}
            id="form-produto"
          >
            {/* Coluna 1 */}
            <div className="column full_height">
              <div className="campo_form">
                <label htmlFor="upload-foto" className="input_upload">
                  {preview ? (
                    <div className="relative_pos full_size_preview">
                      <img
                        src={renderizarPreview(preview)}
                        alt="Preview"
                        className="preview_img"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="btn_delete"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <>
                      <Lucide
                        name="Upload"
                        size={24}
                        className="upload_lucide"
                      />
                      <span>Escolher Imagem</span>
                    </>
                  )}
                </label>
                <input
                  id="upload-foto"
                  type="file"
                  accept="image/*"
                  className="input_img"
                  required={!telaEditar}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="column full_height">
              <div className="campo_form">
                <Lucide name="ALargeSmall" className="lucide" />
                <input
                  type="text"
                  id="titulo"
                  placeholder=" "
                  className="input"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
                <label htmlFor="titulo" className="label">
                  Título
                </label>
              </div>
              <div className="campo_form">
                <Lucide name="Tag" className="lucide" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="preco"
                  placeholder=" "
                  className="input"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                />
                <label htmlFor="preco" className="label">
                  Preço
                </label>
              </div>
              <div className="campo_form">
                <Lucide
                  name="MessageSquareText"
                  className="lucide desc_lucide"
                />
                <textarea
                  id="descricao"
                  placeholder=" "
                  className="textarea"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
                <label htmlFor="descricao" className="label">
                  Descrição
                </label>
              </div>
            </div>

            {/* Coluna 3 */}
            <div className="column full_height">
              {renderSelectCustomizado("tipo")}
              {renderSelectCustomizado("categoria")}
              {renderSelectCustomizado("localizacao")}
              {renderSelectCustomizado("usuario")}

              <div className="campo_form">
                <Lucide name="RulerDimensionLine" className="lucide" />
                <input
                  type="text"
                  id="tamanho"
                  placeholder=" "
                  className="input"
                  value={tamanho}
                  onChange={(e) => setTamanho(e.target.value)}
                  required
                />
                <label htmlFor="tamanho" className="label">
                  Tamanho
                </label>
              </div>
            </div>
          </form>

          <div className="row">
            <Link href="/home" className="btn2">
              Voltar
            </Link>
            <Button type="submit" form="form-produto">
              Salvar
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CadastroProduto;
