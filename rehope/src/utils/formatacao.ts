//? ===================================
//? Transformar preços em BRl (Reais).
//? ===================================
export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: 'BRL' })
}

export const desformatarPreco = (precoStr: string): number => {
    return parseFloat(
      precoStr.replace("R$ ", "").replace(".", "").replace(",", "."),
    );
  };