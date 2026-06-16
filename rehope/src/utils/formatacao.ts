//? ===================================
//? Transformar preços em BRl (Reais).
//? ===================================
export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: 'BRL' })
}