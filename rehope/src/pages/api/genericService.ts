import { api } from "./api";

//? ========================
//?   Interfaces & Types
//? ========================
interface Categoria {
  nomeCategoria: string;
  tipoProdutoID: number;
}

interface Localizacao {
  nomeLocalizacao: string;
}

export interface ProdutoList {
  produtoID: number;
  nomeProduto: string;
  preco: string;
  descricao: string;
  tamanho: string;
  imagemUrl: string;
  statusProduto: boolean;
  codigo: number;
  categoriaID: number;
  localizacaoID: number;
  usuarioID: string;
  tipoProdutoID: number;
}

export type ProdutoForm = {
  nomeProduto: string;
  preco: string;
  descricao: string;
  tamanho: string;
  imagem: File | null;
  statusProduto?: boolean;
  codigo?: number;
  categoriaID: number;
  localizacaoID: number;
  usuarioID: string;
}

interface Usuario {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

//? =============
//? 	Cadastros
//? =============
export async function cadastrarCategoria(dados: Categoria) {
  try {
    const response = await api.post("Categoria", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message || error.response?.data || "Erro na API";
    throw new Error(mensagemErro);
  }
}

export async function cadastrarLocalizacao(dados: Localizacao) {
  try {
    const response = await api.post("Localizacao", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message || error.response?.data || "Erro na API";
    throw new Error(mensagemErro);
  }
}

export async function cadastrarProduto(dados: ProdutoForm) {
  try {
    const formData = new FormData();
    formData.append("nomeProduto", dados.nomeProduto);
    formData.append("preco", dados.preco);
    formData.append("descricao", dados.descricao);
    formData.append("tamanho", dados.tamanho);
    if (dados.imagem) {
      formData.append("imagem", dados.imagem); //? Imagem fica isolada em um "if" pois pode ser null.
    }
    formData.append("categoriaID", dados.categoriaID.toString());
    formData.append("localizacaoID", dados.localizacaoID.toString());
    formData.append("usuarioID", dados.usuarioID);

    const response = await api.post("Produto", formData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data || "Erro inesperado.",
    );
  }
}

export async function cadastrarTipoProduto(dados: ProdutoForm) {
  try {
    const response = await api.post("TipoProduto", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message || error.response?.data || "Erro na API";
    throw new Error(mensagemErro);
  }
}

export async function cadastrarUsuario(dados: Usuario) {
  try {
    const response = await api.post("Usuario", dados);
    return response.data;
  } catch (error: any) {
    const mensagemErro =
      error.response?.data?.message || error.response?.data || "Erro na API";
    throw new Error(mensagemErro);
  }
}

//? =============
//? 	Listagens
//? =============
export async function listarCategoria() {
  try {
    const response = await api.get("Categoria")
    return response.data;
  }
  catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarLocalizacao() {
  try {
    const response = await api.get("Localizacao")
    return response.data;
  }
  catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarProduto() {
  try {
    const response = await api.get<ProdutoList[]>("Produto");

    return response.data.map((produto: ProdutoList) => ({
      ...produto,
      imagemUrl: `${api.defaults.baseURL}${produto.imagemUrl}`,
    }));
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarTipoProduto() {
  try {
    const response = await api.get("TipoProduto")
    return response.data;
  }
  catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarUsuario() {
  try {
    const response = await api.get("Usuario")
    return response.data;
  }
  catch (error: any) {
    throw new Error(error.response.data);
  }
}

//? ====================
//? 	Listagens (IDs)
//? ====================
export async function listarCategoriaPorId(id: number) {
  try {
    const response = await api.get<Categoria>("Categoria/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Categoria por ID");
  }
}

export async function listarLocalizacaoPorId(id: number) {
  try {
    const response = await api.get<Localizacao>("Localizacao/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Localização por ID");
  }
}

export async function listarProdutoPorId(id: string) {
  try {
    const response = await api.get<ProdutoList>("Produto/" + id);
    const produto = {
      ...response.data,
      imagemUrl: `${api.defaults.baseURL}${response.data.imagemUrl}`,
    };
    return produto;
  } catch (error: any) {
    throw new Error(error.response.data || "Erro ao buscar Produto por ID");
  }
}

export async function listarTipoProdutoPorId(id: number) {
  try {
    const response = await api.get<ProdutoForm>("TipoProduto/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Tipo de Produto por ID");
  }
}

export async function listarUsuarioPorId(id: string) {
  try {
    const response = await api.get<Usuario>("Usuario/" + id);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao buscar Usuário por ID");
  }
}

//? ===============
//? 		Edições
//? ===============
export async function editarProduto(produtoId: string, dados: ProdutoForm) {
  try {
    const formData = new FormData();
    formData.append("nomeProduto", dados.nomeProduto);
    formData.append("preco", dados.preco);
    formData.append("descricao", dados.descricao);
    formData.append("tamanho", dados.tamanho);
    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }
    formData.append("categoriaID", dados.categoriaID.toString());
    formData.append("localizacaoID", dados.localizacaoID.toString());
    formData.append("usuarioID", dados.usuarioID);

    const response = await api.put(`Produto/${produtoId}`, formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro inesperado.");
  }
}

//? ===============
//? 		Deletes
//? ===============
export async function deletarCategoria(categoriaId: number) {
  try {
    await api.delete("Categoria/" + categoriaId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Categoria.");
  }
}

export async function deletarLocalizacao(localizacaoId: number) {
  try {
    await api.delete("Localizacao/" + localizacaoId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Localização.");
  }
}

export async function deletarProduto(produtoId: string) {
  try {
    await api.delete("Produto/" + produtoId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Produto.");
  }
}

export async function deletarTipoProduto(tipoProdutoId: number) {
  try {
    await api.delete("tipoProdutoId/" + tipoProdutoId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Tipo de Produto.");
  }
}

export async function deletarUsuario(usuarioId: string) {
  try {
    await api.delete("usuarioId/" + usuarioId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar Usuário.");
  }
}