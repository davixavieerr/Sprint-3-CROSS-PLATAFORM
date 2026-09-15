import React, { createContext, useContext, useState } from 'react';
import { Trecho, Ocorrencia, trechosIniciais } from '../mock/dadosMock';

interface AppContextData {
  trechos: Trecho[];
  ocorrencias: Ocorrencia[];
  adicionarOcorrencia: (ocorrencia: Omit<Ocorrencia, 'id' | 'data'>) => void;
  registrarRocadaConcluida: (trechoId: string) => void;
  obterTrechoPorId: (id: string) => Trecho | undefined;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trechos, setTrechos] = useState<Trecho[]>(trechosIniciais);
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  const adicionarOcorrencia = (nova: Omit<Ocorrencia, 'id' | 'data'>) => {
    const item: Ocorrencia = {
      ...nova,
      id: `OC-${Date.now()}`,
      data: new Date().toLocaleDateString('pt-BR'),
    };
    setOcorrencias((anteriores) => [item, ...anteriores]);
  };

  const registrarRocadaConcluida = (trechoId: string) => {
    setTrechos((anteriores) =>
      anteriores.map((t) => {
        if (t.id === trechoId) {
          return {
            ...t,
            alturaVegetacao: 5.0,
            status: 'normal',
            diasParaLimite: 30,
            ultimaInspecao: new Date().toLocaleDateString('pt-BR'),
            historico: [
              {
                id: `H-${Date.now()}`,
                data: new Date().toLocaleDateString('pt-BR'),
                servico: 'Roçada Concluída (Em Campo)',
                alturaApos: 5.0,
                responsavel: 'Fiscal Conectado',
              },
              ...t.historico,
            ],
          };
        }
        return t;
      })
    );
  };

  const obterTrechoPorId = (id: string) => {
    return trechos.find((t) => t.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        trechos,
        ocorrencias,
        adicionarOcorrencia,
        registrarRocadaConcluida,
        obterTrechoPorId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);