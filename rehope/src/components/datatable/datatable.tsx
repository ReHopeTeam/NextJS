import { formatarPreco } from "@/utils/formatacao";
import styles from "./data-table.module.css";

type Dados = {
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
  localizacaoAnterior: string;
};

const DataTable = ({ dataAlteracao, nomeAnterior, precoAnterior, localizacaoAnterior }: Dados) => {
  return (
    <tr className="tr info">
      <td>{dataAlteracao}</td>
      <td>{nomeAnterior}</td>
      <td>{formatarPreco(precoAnterior)}</td>
      <td>{localizacaoAnterior}</td>
    </tr>
  );
};

export default DataTable;