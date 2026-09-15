export type NivelCriticidade = 'normal' | 'atencao' | 'critico';

export interface HistoricoInspecao {
  id: string;
  data: string;
  servico: string;
  alturaApos: number;
  responsavel: string;
}

export interface Trecho {
  id: string;
  rodovia: string;
  kmInicial: number;
  kmFinal: number;
  sentido: string;
  alturaVegetacao: number; // em cm
  status: NivelCriticidade;
  diasParaLimite: number;  // Projeção preditiva até atingir 30cm
  ultimaInspecao: string;
  historico: HistoricoInspecao[];
}

export interface Ocorrencia {
  id: string;
  trechoId: string;
  km: number;
  tipo: string;
  descricao: string;
  data: string;
  severidade: NivelCriticidade;
}

export const trechosIniciais: Trecho[] = [
  {
    id: 'TR-01',
    rodovia: 'SP-021 (Rodoanel Mário Covas)',
    kmInicial: 12.0,
    kmFinal: 14.5,
    sentido: 'Pista Externa',
    alturaVegetacao: 36.5,
    status: 'critico',
    diasParaLimite: 0,
    ultimaInspecao: '14/09/2026',
    historico: [
      { id: 'H1', data: '10/08/2026', servico: 'Roçada Mecanizada', alturaApos: 6.0, responsavel: 'Equipe Alfa' },
      { id: 'H2', data: '02/09/2026', servico: 'Vistoria com Drone', alturaApos: 28.0, responsavel: 'Fiscal Davi' },
    ],
  },
  {
    id: 'TR-02',
    rodovia: 'SP-021 (Rodoanel Mário Covas)',
    kmInicial: 14.5,
    kmFinal: 17.0,
    sentido: 'Pista Externa',
    alturaVegetacao: 22.0,
    status: 'atencao',
    diasParaLimite: 6,
    ultimaInspecao: '13/09/2026',
    historico: [
      { id: 'H3', data: '15/08/2026', servico: 'Roçada Manual', alturaApos: 7.0, responsavel: 'Equipe Beta' },
    ],
  },
  {
    id: 'TR-03',
    rodovia: 'SP-021 (Rodoanel Mário Covas)',
    kmInicial: 18.0,
    kmFinal: 21.0,
    sentido: 'Pista Interna',
    alturaVegetacao: 8.5,
    status: 'normal',
    diasParaLimite: 24,
    ultimaInspecao: '12/09/2026',
    historico: [
      { id: 'H4', data: '05/09/2026', servico: 'Roçada Mecanizada', alturaApos: 5.0, responsavel: 'Equipe Alfa' },
    ],
  },
  {
    id: 'TR-04',
    rodovia: 'SP-021 (Rodoanel Mário Covas)',
    kmInicial: 22.5,
    kmFinal: 25.0,
    sentido: 'Pista Externa',
    alturaVegetacao: 33.0,
    status: 'critico',
    diasParaLimite: 0,
    ultimaInspecao: '14/09/2026',
    historico: [
      { id: 'H5', data: '01/08/2026', servico: 'Roçada Manual', alturaApos: 6.5, responsavel: 'Equipe Gamma' },
    ],
  },
  {
    id: 'TR-05',
    rodovia: 'SP-021 (Rodoanel Mário Covas)',
    kmInicial: 26.0,
    kmFinal: 29.3,
    sentido: 'Pista Interna',
    alturaVegetacao: 15.0,
    status: 'atencao',
    diasParaLimite: 12,
    ultimaInspecao: '11/09/2026',
    historico: [],
  },
];