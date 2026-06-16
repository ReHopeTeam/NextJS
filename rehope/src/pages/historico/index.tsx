import DataTable from "@/components/datatable/datatable";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { useState } from "react";

type HistoricoAlteracao = {
  logID: number;
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
  localizacaoAnterior: string;
};

const Historico = () => {
  const [historico, setHistorico] = useState<HistoricoAlteracao[] | null>(null);

  return (
    <>
      <Header />
      <main className="min_height">
        <section className="container column">
          {/* {historico === null ? (
          <p>Carregando histórico completo...</p>
        ) : historico.length === 0 ? (
          <p>Não existem registros de alterações no sistema.</p>
        ) : ( */}
          <table className="table">
            <thead>
              <tr className="tr">
                <th>Data da alteração</th>
                <th>Produto</th>
                <th>Preço Anterior</th>
                <th>Local Anterior</th>
              </tr>
            </thead>
            <tbody className="line"></tbody>
            <tfoot className="column">
              {/* {historico.map((item) => ( */}
              <DataTable
                key={1}
                dataAlteracao={"Teste"}
                nomeAnterior={"Teste"}
                precoAnterior={20}
                localizacaoAnterior={"Teste"}
              />
              <DataTable
                key={1}
                dataAlteracao={"Teste"}
                nomeAnterior={"Teste"}
                precoAnterior={20}
                localizacaoAnterior={"Teste"}
              />
              <DataTable
                key={1}
                dataAlteracao={"Teste"}
                nomeAnterior={"Teste"}
                precoAnterior={20}
                localizacaoAnterior={"Teste"}
              />
              <DataTable
                key={1}
                dataAlteracao={"Teste"}
                nomeAnterior={"Teste"}
                precoAnterior={20}
                localizacaoAnterior={"Teste"}
              />
              <DataTable
                key={1}
                dataAlteracao={"Teste"}
                nomeAnterior={"Teste"}
                precoAnterior={20}
                localizacaoAnterior={"Teste"}
              />
              {/* ))} */}
            </tfoot>
          </table>
          {/* )} */}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Historico;