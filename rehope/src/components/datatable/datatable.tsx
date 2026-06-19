import { formatarPreco } from "@/utils/formatacao";

type Dados = {
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
  localizacaoIDAnterior: string;
};

const DataTable = ({
  dataAlteracao,
  nomeAnterior,
  precoAnterior,
  localizacaoIDAnterior,
}: Dados) => {
  return (
    <tr className="tr info">
      <td>{dataAlteracao}</td>
      <td>{nomeAnterior}</td>
      <td>{formatarPreco(precoAnterior)}</td>
      <td>{localizacaoIDAnterior}</td>
    </tr>
  );
};

export default DataTable;
