import { api } from "./api";

//? =============
//? 		Types
//? =============
type ProdutoForm = {
  nomeProduto: string;
  preco: string;
  descricao: string;
  tamanho: string;
  imagem: File | null;
  statusProduto: boolean;
  codigo: number;
  categoriaID: number[];
  localizacaoID: number[];
  usuarioID: string;
};

//? =============
//? 	Interfaces
//? =============
interface Categoria {
  nomeCategoria: string;
	tipoProdutoID: number[];
}

interface ProdutoList {
  nomeProduto: string;
  preco: string;
  descricao: string;
  tamanho: string;
  imagemUrl: string;
  statusProduto: boolean;
  codigo: number;
  categoriaID: number[];
  localizacaoID: number[];
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
    dados.categoriaID.forEach((id) =>
      formData.append("categoriaID", id.toString()),
    );
    dados.localizacaoID.forEach((id) =>
      formData.append("localizacaoID", id.toString()),
    );
    formData.append("usuarioID", dados.usuarioID.toString());

    await api.post("Produto", formData);
  } catch (error: any) {
    throw new Error(
      error.response?.data || error.message || "Erro inesperado.",
    );
  }
}

export async function cadatrarCategoria(dados: Categoria) {
	try {
		const response = await api.post("Categoria", dados);
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
export async function listarCategoria()
{
	try
	{
		const response = await api.get("Categoria")
		return response;
	}
	catch(error: any)
	{
		throw new Error(error.response.data);
	}
}

export async function listarLocalizacao()
{
	try
	{
		const response = await api.get("Localizacao")
		return response;
	}
	catch(error: any)
	{
		throw new Error(error.response.data);
	}
}

export async function listarProduto() {
  try {
    const response = await api.get<ProdutoList[]>("Produto");

    const produtosAtivos = response.data.filter(
      (produto: ProdutoList) => produto.statusProduto === true,
    );

    const produtos = produtosAtivos.map((produto: ProdutoList) => ({
      ...produto,
      imagemUrl: `${api.defaults.baseURL}${produto.imagemUrl}`,
    }));

    return produtos;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarTipoProduto()
{
	try
	{
		const response = await api.get("TipoProduto")
		return response;
	}
	catch(error: any)
	{
		throw new Error(error.response.data);
	}
}

export async function listarUsuario()
{
	try
	{
		const response = await api.get("Usuario")
		return response;
	}
	catch(error: any)
	{
		throw new Error(error.response.data);
	}
}

//? ====================
//? 	Listagens (IDs)
//? ====================
export async function listarProdutoPorId(id: number) {
  try {
    const response = await api.get<ProdutoList>("Produto/" + id);

    const produto = {
      ...response.data,
      imagemUrl: `${api.defaults.baseURL}${response.data.imagemUrl}`,
    };

    return produto;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

//? ===============
//? 		Edições
//? ===============
export async function editarProduto(produtoId: number, dados: ProdutoForm) {
  try {
    const formData = new FormData();
    formData.append("nomeProduto", dados.nomeProduto);
    formData.append("preco", dados.preco);
    formData.append("descricao", dados.descricao);
    formData.append("tamanho", dados.tamanho);
    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }
    dados.categoriaID.forEach((id) =>
      formData.append("categoriaID", id.toString()),
    );
    dados.localizacaoID.forEach((id) =>
      formData.append("localizacaoID", id.toString()),
    );
    formData.append("usuarioID", dados.usuarioID.toString());

    await api.put("Produto/" + produtoId, formData);
  } catch (error: any) {
    throw new Error(
      error.response?.data || error.message || "Erro inesperado.",
    );
  }
}

//? ===============
//? 		Deletes
//? ===============
export async function deletarProduto(produtoId: number) {
  try {
    await api.delete("Produto/" + produtoId);
  } catch (error: any) {
    throw new Error(error.response?.data || "Erro ao deletar produto.");
  }
}