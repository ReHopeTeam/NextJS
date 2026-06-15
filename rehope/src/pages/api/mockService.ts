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
  { produtoID: 12, codigo: "BAZ-012", nome: "Kit de Pincéis de Pintura Artística", preco: "R$ 42,50", status: false, descricao: "Cerdas de nylon, 12 unidades.", tipo: "Papelaria", categoria: "Artesanato", localizacao: "Corredor C - Prateleira 3", tamanho: "Variados", usuario: "Mariana Costa" },
  { produtoID: 13, codigo: "BAZ-013", nome: "Almofada de Veludo Premium Terracota", preco: "R$ 49,90", status: true, descricao: "Zíper invisível, enchimento antialérgico.", tipo: "Decoração", categoria: "Sala", localizacao: "Corredor B - Prateleira 2", tamanho: "45x45cm", usuario: "Carlos Silva" },
  { produtoID: 14, codigo: "BAZ-014", nome: "Moedor de Café Manual em Inox", preco: "R$ 74,90", status: true, descricao: "Engrenagens de cerâmica cônica.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 3", tamanho: "18x5cm", usuario: "Ana Souza" },
  { produtoID: 15, codigo: "BAZ-015", nome: "Caixa Organizadora de Tecido Dobrável", preco: "R$ 31,90", status: true, descricao: "Estrutura rígida em TNT reforçado.", tipo: "Organização", categoria: "Quarto", localizacao: "Corredor C - Prateleira 2", tamanho: "30x30x30cm", usuario: "Mariana Costa" },
  { produtoID: 16, codigo: "BAZ-016", nome: "Kit de Canetas Gel Fineliner (24 Cores)", preco: "R$ 38,00", status: true, descricao: "Ponta 0.4mm, secagem rápida.", tipo: "Papelaria", categoria: "Escritório", localizacao: "Corredor E - Prateleira 1", tamanho: "0.4mm", usuario: "Ana Souza" },
  { produtoID: 17, codigo: "BAZ-017", nome: "Difusor de Aromas Ultrassônico", preco: "R$ 89,00", status: true, descricao: "LED 7 cores, desliga automaticamente.", tipo: "Decoração", categoria: "Bem-estar", localizacao: "Mesa Central 1", tamanho: "300ml", usuario: "Carlos Silva" },
  { produtoID: 18, codigo: "BAZ-018", nome: "Forma de Silicone para Gelo de Esfera", preco: "R$ 24,90", status: true, descricao: "4 esferas, silicone livre de BPA.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 5", tamanho: "4 Cavidades", usuario: "Mariana Costa" },
  { produtoID: 19, codigo: "BAZ-019", nome: "Quadro Decorativo Canvas Botânico", preco: "R$ 69,90", status: false, descricao: "Canvas em chassi de madeira.", tipo: "Decoração", categoria: "Sala", localizacao: "Corredor B - Prateleira 4", tamanho: "40x60cm", usuario: "Carlos Silva" },
  { produtoID: 20, codigo: "BAZ-020", nome: "Suporte Articulado de Mesa para Monitor", preco: "R$ 139,90", status: true, descricao: "Pistão a gás, gira 360 graus.", tipo: "Informática", categoria: "Escritório", localizacao: "Corredor D - Prateleira 3", tamanho: "Até 32pol", usuario: "Ana Souza" },
  { produtoID: 21, codigo: "BAZ-021", nome: "Balança Digital de Cozinha Precisão", preco: "R$ 32,00", status: true, descricao: "Até 10kg, função Tara.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 1", tamanho: "Compacto", usuario: "Mariana Costa" },
  { produtoID: 22, codigo: "BAZ-022", nome: "Kit de Cabides de Veludo (10 Unidades)", preco: "R$ 45,90", status: true, descricao: "Ultrafinos, gancho cromado.", tipo: "Organização", categoria: "Quarto", localizacao: "Corredor C - Prateleira 4", tamanho: "Adulto", usuario: "Carlos Silva" },
  { produtoID: 23, codigo: "BAZ-023", nome: "Bloco de Notas Autocolantes Neon", preco: "R$ 15,90", status: true, descricao: "4 blocos, cores neon.", tipo: "Papelaria", categoria: "Escritório", localizacao: "Corredor E - Prateleira 2", tamanho: "76x76mm", usuario: "Ana Souza" },
  { produtoID: 24, codigo: "BAZ-024", nome: "Cesta Organizadora de Rattan com Tampa", preco: "R$ 55,00", status: true, descricao: "Plástico lavável resistente.", tipo: "Organização", categoria: "Lavanderia", localizacao: "Corredor C - Prateleira 2", tamanho: "15L", usuario: "Mariana Costa" },
  { produtoID: 25, codigo: "BAZ-025", nome: "Tábua de Corte em Bambu com Canaleta", preco: "R$ 48,00", status: true, descricao: "Propriedades bactericidas.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 3", tamanho: "35x25cm", usuario: "Carlos Silva" },
  { produtoID: 26, codigo: "BAZ-026", nome: "Vela Aromática de Lavanda e Baunilha", preco: "R$ 42,90", status: true, descricao: "Cera de soja vegetal.", tipo: "Decoração", categoria: "Bem-estar", localizacao: "Mesa Central 1", tamanho: "150g", usuario: "Ana Souza" },
  { produtoID: 27, codigo: "BAZ-027", nome: "Lancheira Térmica Impermeável", preco: "R$ 49,90", status: false, descricao: "Revestimento em alumínio isolante.", tipo: "Utilidades", categoria: "Uso Pessoal", localizacao: "Corredor D - Prateleira 1", tamanho: "23x14x20cm", usuario: "Mariana Costa" },
  { produtoID: 28, codigo: "BAZ-028", nome: "Kit Estilete de Precisão", preco: "R$ 19,90", status: true, descricao: "5 lâminas extras, cabo de alumínio.", tipo: "Papelaria", categoria: "Artesanato", localizacao: "Corredor E - Prateleira 3", tamanho: "Caneta", usuario: "Carlos Silva" },
  { produtoID: 29, codigo: "BAZ-029", nome: "Espátula de Silicone Inteiriça", preco: "R$ 18,50", status: true, descricao: "Suporta 230°C, higiênica.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 5", tamanho: "28cm", usuario: "Ana Souza" },
  { produtoID: 30, codigo: "BAZ-030", nome: "Porta-Retrato Metal Rose Gold", preco: "R$ 36,00", status: true, descricao: "Efeito flutuante geométrico.", tipo: "Decoração", categoria: "Sala / Quarto", localizacao: "Mesa Central 2", tamanho: "10x15cm", usuario: "Mariana Costa" },
  { produtoID: 31, codigo: "BAZ-031", nome: "Porta-Copos de Cortiça (6 Unidades)", preco: "R$ 14,90", status: true, descricao: "Cortiça natural, absorvente.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 2", tamanho: "10cm", usuario: "Carlos Silva" },
  { produtoID: 32, codigo: "BAZ-032", nome: "Grampeador de Mesa Compacto Metálico", preco: "R$ 27,90", status: true, descricao: "Base emborrachada, 20 folhas.", tipo: "Papelaria", categoria: "Escritório", localizacao: "Corredor E - Prateleira 1", tamanho: "12cm", usuario: "Ana Souza" },
  { produtoID: 33, codigo: "BAZ-033", nome: "Abridor de Vinho Elétrico", preco: "R$ 120,00", status: true, descricao: "Abre garrafas em segundos, recarregável.", tipo: "Cozinha", categoria: "Bar", localizacao: "Corredor A - Prateleira 6", tamanho: "20cm", usuario: "Carlos Silva" },
  { produtoID: 34, codigo: "BAZ-034", nome: "Suporte de Plantas em Macramê", preco: "R$ 55,00", status: true, descricao: "Cordão de algodão feito à mão.", tipo: "Decoração", categoria: "Sala", localizacao: "Corredor B - Prateleira 4", tamanho: "90cm", usuario: "Ana Souza" },
  { produtoID: 35, codigo: "BAZ-035", nome: "Mousepad Ergonômico com Apoio", preco: "R$ 25,00", status: true, descricao: "Base em gel para descanso de pulso.", tipo: "Informática", categoria: "Escritório", localizacao: "Corredor E - Prateleira 4", tamanho: "Padrão", usuario: "Mariana Costa" },
  { produtoID: 36, codigo: "BAZ-036", nome: "Escorredor de Louça Dobrável", preco: "R$ 65,00", status: true, descricao: "Silicone retrátil, economiza espaço.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 2", tamanho: "Grande", usuario: "Carlos Silva" },
  { produtoID: 37, codigo: "BAZ-037", nome: "Aromatizador de Varetas (Refil)", preco: "R$ 35,00", status: true, descricao: "Fragrância bambu, alta duração.", tipo: "Decoração", categoria: "Bem-estar", localizacao: "Mesa Central 1", tamanho: "250ml", usuario: "Ana Souza" },
  { produtoID: 38, codigo: "BAZ-038", nome: "Relógio de Parede Minimalista", preco: "R$ 80,00", status: true, descricao: "Mecanismo silencioso, sem tique-taque.", tipo: "Decoração", categoria: "Sala / Quarto", localizacao: "Corredor B - Prateleira 1", tamanho: "30cm", usuario: "Mariana Costa" },
  { produtoID: 39, codigo: "BAZ-039", nome: "Conjunto de Panos de Prato (3 Unidades)", preco: "R$ 25,00", status: true, descricao: "Tecido atoalhado absorvente.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 5", tamanho: "40x60cm", usuario: "Carlos Silva" },
  { produtoID: 40, codigo: "BAZ-040", nome: "Cortador de Legumes Multifuncional", preco: "R$ 45,00", status: true, descricao: "Lâminas em inox, corta cubos e fatias.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 3", tamanho: "Compacto", usuario: "Ana Souza" },
  { produtoID: 41, codigo: "BAZ-041", nome: "Luminária de Led para Leitura", preco: "R$ 40,00", status: true, descricao: "Flexível, luz fria sem brilho.", tipo: "Iluminação", categoria: "Escritório", localizacao: "Corredor D - Prateleira 2", tamanho: "Pequena", usuario: "Mariana Costa" },
  { produtoID: 42, codigo: "BAZ-042", nome: "Fita Led RGB com Controle", preco: "R$ 70,00", status: true, descricao: "16 cores, autoadesiva.", tipo: "Decoração", categoria: "Sala / Quarto", localizacao: "Corredor D - Prateleira 4", tamanho: "5 metros", usuario: "Carlos Silva" },
  { produtoID: 43, codigo: "BAZ-043", nome: "Kit de Costura de Viagem", preco: "R$ 15,00", status: true, descricao: "Agulhas, linhas e tesoura compacta.", tipo: "Organização", categoria: "Uso Pessoal", localizacao: "Corredor C - Prateleira 3", tamanho: "Bolso", usuario: "Ana Souza" },
  { produtoID: 44, codigo: "BAZ-044", nome: "Protetor de Quina de Mesa (4 Unidades)", preco: "R$ 20,00", status: true, descricao: "Silicone macio para segurança.", tipo: "Utilidades", categoria: "Segurança", localizacao: "Corredor C - Prateleira 4", tamanho: "Padrão", usuario: "Mariana Costa" },
  { produtoID: 45, codigo: "BAZ-045", nome: "Organizador de Cabos (5 Unidades)", preco: "R$ 12,00", status: true, descricao: "Velcro autocolante.", tipo: "Organização", categoria: "Escritório", localizacao: "Corredor E - Prateleira 2", tamanho: "Variados", usuario: "Carlos Silva" },
  { produtoID: 46, codigo: "BAZ-046", nome: "Porta-Chaves de Parede", preco: "R$ 30,00", status: true, descricao: "Madeira rústica com 4 ganchos.", tipo: "Decoração", categoria: "Entrada", localizacao: "Gôndola de Entrada", tamanho: "20x10cm", usuario: "Ana Souza" },
  { produtoID: 47, codigo: "BAZ-047", nome: "Capa de Almofada Geométricas (Par)", preco: "R$ 28,00", status: true, descricao: "Estampa moderna em algodão.", tipo: "Decoração", categoria: "Sala", localizacao: "Corredor B - Prateleira 2", tamanho: "45x45cm", usuario: "Mariana Costa" },
  { produtoID: 48, codigo: "BAZ-048", nome: "Mini Ventilador de Mesa USB", preco: "R$ 55,00", status: true, descricao: "Silencioso, 3 velocidades.", tipo: "Informática", categoria: "Escritório", localizacao: "Corredor D - Prateleira 3", tamanho: "15cm", usuario: "Carlos Silva" },
  { produtoID: 49, codigo: "BAZ-049", nome: "Suporte para Celular de Mesa", preco: "R$ 25,00", status: true, descricao: "Alumínio, base antiderrapante.", tipo: "Informática", categoria: "Escritório", localizacao: "Corredor D - Prateleira 4", tamanho: "Universal", usuario: "Ana Souza" },
  { produtoID: 50, codigo: "BAZ-050", nome: "Porta-Sabonete Líquido Vidro", preco: "R$ 22,00", status: true, descricao: "Válvula pump cromada.", tipo: "Decoração", categoria: "Banheiro", localizacao: "Corredor C - Prateleira 1", tamanho: "300ml", usuario: "Mariana Costa" },
  { produtoID: 51, codigo: "BAZ-051", nome: "Escova de Limpeza para Garrafas", preco: "R$ 15,00", status: true, descricao: "Cerdas duras, cabo longo.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 4", tamanho: "30cm", usuario: "Carlos Silva" },
  { produtoID: 52, codigo: "BAZ-052", nome: "Luva Térmica de Cozinha", preco: "R$ 20,00", status: true, descricao: "Resistente a calor, tecido grosso.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 5", tamanho: "Único", usuario: "Ana Souza" },
  { produtoID: 53, codigo: "BAZ-053", nome: "Prendedores de Roupa de Madeira (24 unidades)", preco: "R$ 10,00", status: true, descricao: "Madeira resistente.", tipo: "Organização", categoria: "Lavanderia", localizacao: "Corredor C - Prateleira 2", tamanho: "Padrão", usuario: "Mariana Costa" },
  { produtoID: 54, codigo: "BAZ-054", nome: "Saco a Vácuo para Roupas (Grande)", preco: "R$ 35,00", status: true, descricao: "Reduz volume em até 70%.", tipo: "Organização", categoria: "Quarto", localizacao: "Corredor C - Prateleira 4", tamanho: "80x100cm", usuario: "Carlos Silva" },
  { produtoID: 55, codigo: "BAZ-055", nome: "Descascador de Legumes Inox", preco: "R$ 15,00", status: true, descricao: "Cabo anatômico, lâmina dupla.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 3", tamanho: "15cm", usuario: "Ana Souza" },
  { produtoID: 56, codigo: "BAZ-056", nome: "Rolo de Massa em Madeira", preco: "R$ 30,00", status: true, descricao: "Madeira maciça, giratório.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 1", tamanho: "40cm", usuario: "Mariana Costa" },
  { produtoID: 57, codigo: "BAZ-057", nome: "Filtro de Chá em Inox", preco: "R$ 18,00", status: true, descricao: "Rede fina, evita resíduos.", tipo: "Cozinha", categoria: "Uso Pessoal", localizacao: "Corredor A - Prateleira 2", tamanho: "6cm", usuario: "Carlos Silva" },
  { produtoID: 58, codigo: "BAZ-058", nome: "Caneca de Cerâmica Minimalista", preco: "R$ 25,00", status: true, descricao: "Cor fosca, alta qualidade.", tipo: "Cozinha", categoria: "Utilidades Domésticas", localizacao: "Corredor A - Prateleira 1", tamanho: "300ml", usuario: "Ana Souza" },
  { produtoID: 59, codigo: "BAZ-059", nome: "Tapete de Banheiro Antiderrapante", preco: "R$ 45,00", status: true, descricao: "Microfibra ultra macia.", tipo: "Decoração", categoria: "Banheiro", localizacao: "Corredor B - Prateleira 3", tamanho: "40x60cm", usuario: "Mariana Costa" },
  { produtoID: 60, codigo: "BAZ-060", nome: "Cortina de Voil Branca", preco: "R$ 90,00", status: true, descricao: "Leve e translúcida.", tipo: "Decoração", categoria: "Sala / Quarto", localizacao: "Corredor B - Prateleira 4", tamanho: "2m x 2m", usuario: "Carlos Silva" },
  { produtoID: 61, codigo: "BAZ-061", nome: "Organizador de Gaveta Colmeia", preco: "R$ 40,00", status: true, descricao: "Kit com 6 colmeias.", tipo: "Organização", categoria: "Quarto", localizacao: "Corredor C - Prateleira 3", tamanho: "Padrão", usuario: "Ana Souza" },
  { produtoID: 62, codigo: "BAZ-062", nome: "Esponja de Banho Esfoliante", preco: "R$ 12,00", status: true, descricao: "Textura dupla face.", tipo: "Utilidades", categoria: "Bem-estar", localizacao: "Corredor C - Prateleira 1", tamanho: "Padrão", usuario: "Mariana Costa" },
  { produtoID: 63, codigo: "BAZ-063", nome: "Prendedor de Livros (Par)", preco: "R$ 25,00", status: true, descricao: "Metal resistente, design minimalista.", tipo: "Decoração", categoria: "Escritório", localizacao: "Corredor D - Prateleira 4", tamanho: "15cm", usuario: "Carlos Silva" },
  { produtoID: 64, codigo: "BAZ-064", nome: "Calendário de Mesa Permanente", preco: "R$ 35,00", status: true, descricao: "Madeira e blocos giratórios.", tipo: "Papelaria", categoria: "Escritório", localizacao: "Gôndola de Entrada", tamanho: "12x8cm", usuario: "Ana Souza" }
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