import Button from "@/components/button/button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Lucide from "@/utils/lucide";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { erro, notificacao } from "@/utils/toast";
import {
  cadastrarProduto,
  Categoria,
  editarProduto,
  listarCategoria,
  listarLocalizacao,
  listarProdutoPorId,
  listarTipoProduto,
  listarUsuario,
  Localizacao,
  ProdutoForm,
  TipoProduto,
  Usuario,
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
  const [listaTipos, setListaTipos] = useState<TipoProduto[]>([]);
  const [listaLocalizacoes, setListaLocalizacoes] = useState<Localizacao[]>([]);
  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);
  const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);

  // Estado para filtrar categorias e só puxar de acordo com o "Tipo"
  const [categoriasFiltradas, setCategoriasFiltradas] = useState<Categoria[]>([]);

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
      url.startsWith("https://") ||
      url.startsWith("data:")
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
      setTamanho(produto.tamanho || (produto as any).Tamanho || "");

      const tipoSeguro = produto.tipoProdutoID ?? (produto as any).tipoProdutoId;
      const categoriaSegura = produto.categoriaID ?? (produto as any).categoriaId;
      const localizacaoSegura = produto.localizacaoID ?? (produto as any).localizacaoId;
      const usuarioSeguro = produto.usuarioID ?? (produto as any).usuarioId;

      setValoresSelect({
        tipo: tipoSeguro != null ? String(tipoSeguro) : "",
        categoria: categoriaSegura != null ? String(categoriaSegura) : "",
        localizacao: localizacaoSegura != null ? String(localizacaoSegura) : "",
        usuario: usuarioSeguro != null ? String(usuarioSeguro) : "",
      });

      if (produto.imagemUrl) {
        setPreview(produto.imagemUrl);
      }
    } catch (error) {
      erro("Erro ao carregar dados do produto");
    }
  }

  useEffect(() => {
    if (!valoresSelect.tipo || listaCategorias.length === 0) return;

    const categorias = listaCategorias.filter(
      (categoria) =>
        categoria.tipoProdutoID === Number(valoresSelect.tipo)
    );

    setCategoriasFiltradas(categorias);
  }, [valoresSelect.tipo, listaCategorias]);

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

    if (telaEditar && !id) {
      erro("ID do produto não encontrado para edição.");
      return;
    }

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
    setValoresSelect((prev) => {
      const novosValores = { ...prev, [campo]: valor, };

      if (campo === "tipo") {
        const categorias = listaCategorias.filter(
          (categoria) => categoria.tipoProdutoID === Number(valor)
        );

        setCategoriasFiltradas(categorias);
        novosValores.categoria = "";
      }

      return novosValores;
    });

    setSelectAberto((prev) => ({ ...prev, [campo]: false, }));
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
      listaAlvo = categoriasFiltradas;
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
        <svg
          width="265"
          height="592"
          viewBox="0 0 265 592"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed path2"
          style={{ left: "0", top: "240" }}
        >
          <path
            d="M-1.86295 104.196C123.047 137.918 143.137 -39.8031 202.637 
            30.6968C262.137 101.197 148.637 111.197 132.137 202.697C115.637 
            294.197 208.638 265.196 242.121 336.696C275.605 408.195 198.138 
            502.197 122.138 484.696C46.1375 467.195 -32 577.619 -32 577.619"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>

        <svg
          width="265"
          height="592"
          viewBox="0 0 265 592"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed path2"
          style={{ right: "-100", top: "90" }}
        >
          <path
            d="M173.295 409.198C173.295 409.198 69.7944 381.967 57.7955 328.197C45.3221 
            272.301 118.796 295.197 135.296 203.697C151.796 112.197 55.2792 221.197 21.7954 
            149.697C-11.6883 78.1978 31.242 34.2975 86.2959 13.6974C129.816 -2.58704 202.294 40.1974 202.294 40.1974"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>
        <section className="container column">
          <h1 className="title2">
            {telaEditar ? "Editar" : "Cadastrar"} Produto
          </h1>

          <form
            className="form grid info"
            ref={formRef}
            onSubmit={salvarProduto}
            id="form-produto"
          >
            {/* Coluna 1 */}
            <div className="column full_height">
              <div className="campo_img">
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
                  type="text"
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
