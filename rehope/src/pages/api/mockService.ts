type Produto = {
  produtoID: number;
  codigo: string;
  nome: string;
  preco: string;
  status: boolean;
  descricao: string;
  tipo: string;
  categoria: string;
  localizacao: string;
  tamanho: string;
  usuario: string;
};

// Banco de dados simulado (Mock) com 64 produtos
const produtosSimulados: Produto[] = [
  { produtoID: 1, codigo: "BAZ-001", nome: "Jogo de Pratos de Cerâmica", preco: "R$ 149,90", status: true, 
    descricao: "6 pratos rasos de cerâmica artesanal. placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 2", tamanho: "26cm", usuario: "Carlos Silva" },
  { produtoID: 2, codigo: "BAZ-002", nome: "Vaso de Vidro Decorativo Ambar", preco: "R$ 45,00", status: true, descricao: "Vidro soprado com textura canelada.", tipo: "Decoração", categoria: "Sala", localizacao: "Mesa Central 1", tamanho: "22cm", usuario: "Ana Souza" },
  { produtoID: 3, codigo: "BAZ-003", nome: "Organizador de Acrílico para Maquiagem", preco: "R$ 39,90", status: false, descricao: "4 gavetas removíveis com forro aveludado.", tipo: "Organização", categoria: "Quarto / Banheiro", localizacao: "Corredor C - Prateleira 1", tamanho: "20x15x10cm", usuario: "Mariana Costa" },
  { produtoID: 4, codigo: "BAZ-004", nome: "Kit de Potes Herméticos de Vidro (3 Unidades)", preco: "R$ 89,90", status: true, descricao: "Vidro borossilicato com tampa de bambu.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 4", tamanho: "500ml-1L", usuario: "Carlos Silva" },
  { produtoID: 5, codigo: "BAZ-005", nome: "Caderno Planner Semanal Wire-O", preco: "R$ 29,90", status: true, descricao: "Capa dura, miolo não datado.", tipo: "Papelaria", categoria: "Escritório", localizacao: "Gôndola de Entrada", tamanho: "A5", usuario: "Ana Souza" },
  { produtoID: 6, codigo: "BAZ-006", nome: "Manta de Sofá em Algodão com Franjas", preco: "R$ 79,00", status: false, descricao: "100% algodão, tear mineiro.", tipo: "Decoração", categoria: "Sala", localizacao: "Corredor B - Prateleira 3", tamanho: "1,20m x 1,50m", usuario: "Mariana Costa" },
  { produtoID: 7, codigo: "BAZ-007", nome: "Luminária de Mesa Articulada Pixie", preco: "R$ 64,90", status: true, descricao: "Aço carbono, pintura eletrostática.", tipo: "Iluminação", categoria: "Escritório", localizacao: "Corredor D - Prateleira 2", tamanho: "45cm", usuario: "Carlos Silva" },
  { produtoID: 8, codigo: "BAZ-008", nome: "Conjunto de Talheres Inox Gold (24 Peças)", preco: "R$ 199,90", status: true, descricao: "Banho ionizado dourado.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 1", tamanho: "Padrão", usuario: "Ana Souza" },
  { produtoID: 9, codigo: "BAZ-009", nome: "Tapete Capacho Antiderrapante Welcome", preco: "R$ 34,90", status: true, descricao: "Fibras de coco natural.", tipo: "Decoração", categoria: "Entrada", localizacao: "Gôndola de Entrada", tamanho: "60x40cm", usuario: "Mariana Costa" },
  { produtoID: 10, codigo: "BAZ-010", nome: "Espelho de Parede Adnet Redondo", preco: "R$ 115,00", status: true, descricao: "Alça de couro sintético.", tipo: "Decoração", categoria: "Sala / Banheiro", localizacao: "Mesa Central 2", tamanho: "45cm", usuario: "Carlos Silva" },
  { produtoID: 11, codigo: "BAZ-011", nome: "Garrafa Térmica de Inox com Termômetro", preco: "R$ 59,90", status: true, descricao: "Display LED, parede dupla.", tipo: "Utilidades", categoria: "Uso Pessoal", localizacao: "Corredor D - Prateleira 1", tamanho: "500ml", usuario: "Ana Souza" },
];

// Simula a busca de um produto por ID
export async function listarPorId(id: number): Promise<Produto> {
  return new Promise((resolve, reject) => {
    const produtoEncontrado = produtosSimulados.find(
      (p) => p.produtoID === id,
    );

    if (produtoEncontrado) {
      resolve(produtoEncontrado);
    } else {
      reject(new Error(`Produto com o ID ${id} não foi encontrado.`));
    }
  });
}

export async function listar(): Promise<Produto[]> {
  return new Promise((resolve) => {
    resolve(produtosSimulados);
  });
}