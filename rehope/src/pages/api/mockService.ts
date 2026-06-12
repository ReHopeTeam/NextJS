type Produto = {
  produtoID: number;
  codigo: string;
  nome: string;
  preço: string;
  status: boolean;
  descricao: string;
  tipo: string;
  categoria: string;
  localizacao: string;
  tamanho: string;
  usuario: string;
};

// Banco de dados simulado (Mock)
const produtosSimulados: Produto[] = [
  {
    produtoID: 1,
    codigo: "BAZ-001",
    nome: "Jogo de Pratos de Cerâmica",
    preço: "R$ 149,90",
    status: true,
    descricao:
      "Este elegante conjunto conta com 6 pratos rasos confeccionados em cerâmica artesanal de alta resistência, apresentando acabamento esmaltado fosco com bordas irregulares que trazem um charme rústico e contemporâneo para a mesa. Perfeitos tanto para o uso diário quanto para ocasiões especiais, são totalmente seguros para utilização em forno micro-ondas e máquina de lavar louças. Sua composição robusta garante excelente retenção de temperatura para os alimentos e alta durabilidade contra riscos de talheres.",
    tipo: "Cozinha",
    categoria: "Utilidades Domésticas",
    localizacao: "Corredor A - Prateleira 2",
    tamanho: "26cm (diâmetro)",
    usuario: "Carlos Silva",
  },
  {
    produtoID: 2,
    codigo: "BAZ-002",
    nome: "Vaso de Vidro Decorativo Ambar",
    preço: "R$ 45,00",
    status: true,
    descricao:
      "Um toque de sofisticação retrô para qualquer ambiente. Este vaso decorativo é produzido em vidro translúcido soprado com uma belíssima tonalidade âmbar e textura canelada que reflete a luz de forma única. Seu design com gargalo estreito é ideal para acomodar arranjos de capim-dos-pampas, galhos secos, flores naturais ou até mesmo para ser utilizado como peça isolada em centros de mesa, aparadores e prateleiras de salas de estar ou escritórios. Limpar apenas com pano seco e macio para preservar o brilho.",
    tipo: "Decoração",
    categoria: "Sala",
    localizacao: "Mesa Central 1",
    tamanho: "Médio (22cm)",
    usuario: "Ana Souza",
  },
  {
    produtoID: 3,
    codigo: "BAZ-003",
    nome: "Organizador de Acrílico para Maquiagem",
    preço: "R$ 39,90",
    status: false,
    descricao:
      "Maximize o espaço da sua penteadeira ou bancada de banheiro com este organizador multiuso premium. Fabricado em acrílico injetado cristal de alta espessura e totalmente transparente, ele facilita a visualização rápida de todos os seus itens. Possui 4 gavetas totalmente removíveis com puxadores anatômicos e forro interno aveludado para proteger joias e relógios, além de um compartimento superior com 12 divisórias sob medida para batons, pincéis, bases, esmaltes e cosméticos em geral.",
    tipo: "Organização",
    categoria: "Quarto / Banheiro",
    localizacao: "Corredor C - Prateleira 1",
    tamanho: "20x15x10cm",
    usuario: "Mariana Costa",
  },
  {
    produtoID: 4,
    codigo: "BAZ-004",
    nome: "Kit de Potes Herméticos de Vidro (3 Unidades)",
    preço: "R$ 89,90",
    status: true,
    descricao:
      "Mantenha seus mantimentos frescos por muito mais tempo e organize sua despensa com estilo. Este kit traz 3 potes cilíndricos feitos de vidro borossilicato de alta resistência térmica (que não retém odores nem manchas de alimentos). O grande diferencial fica por conta das tampas ecológicas de bambu natural, que possuem um anel de vedação em silicone hermético de alta performance, bloqueando totalmente a entrada de ar e umidade. Ideais para armazenar grãos, massas, café, açúcar, biscoitos ou cereais.",
    tipo: "Cozinha",
    categoria: "Utilidades Domésticas",
    localizacao: "Corredor A - Prateleira 4",
    tamanho: "500ml, 800ml e 1L",
    usuario: "Carlos Silva",
  },
  {
    produtoID: 5,
    codigo: "BAZ-005",
    nome: "Caderno Planner Semanal Wire-O",
    preço: "R$ 29,90",
    status: true,
    descricao:
      "A ferramenta perfeita para tirar suas metas do papel e organizar sua rotina corporativa, acadêmica ou pessoal. Este planner possui miolo não datado, permitindo que você comece a usá-lo em qualquer época do ano sem desperdício de páginas. Conta com capa dura de toque acetinado, fechamento em elástico chato resistente, espiral metálico duplo (Wire-O) que abre em 180° e folhas internas de gramatura encorpada (90g/m²) que evitam que a tinta da caneta passe para o outro lado. Inclui páginas para controle financeiro e metas mensais.",
    tipo: "Papelaria",
    categoria: "Escritório",
    localizacao: "Gôndola de Entrada",
    tamanho: "A5",
    usuario: "Ana Souza",
  },
  {
    produtoID: 6,
    codigo: "BAZ-006",
    nome: "Manta de Sofá em Algodão com Franjas",
    preço: "R$ 79,00",
    status: false,
    descricao:
      "Proporcione conforto térmico e renove o visual do seu estofado instantaneamente. Tecida de forma semiartesanal em tear mineiro tradicional, esta manta é composta por fios 100% algodão selecionados, garantindo um toque extremamente macio, aconchegante e excelente caimento. O acabamento lateral possui franjas amarradas à mão, conferindo um charme estilo boho chic. É extremamente versátil: pode ser usada dobrada no braço do sofá, estendida como protetor de assento ou como peseira decorativa em camas de casal.",
    tipo: "Decoração",
    categoria: "Sala",
    localizacao: "Corredor B - Prateleira 3",
    tamanho: "1,20m x 1,50m",
    usuario: "Mariana Costa",
  },
];

// Simula a busca de um produto por ID
export async function listarPorId(id: number): Promise<Produto> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produtoEncontrado = produtosSimulados.find(
        (p) => p.produtoID === id,
      );

      if (produtoEncontrado) {
        resolve(produtoEncontrado);
      } else {
        reject(new Error(`Produto com o ID ${id} não foi encontrado.`));
      }
    });
  });
}
