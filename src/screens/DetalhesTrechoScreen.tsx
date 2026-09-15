import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { cores } from '../theme/cores';

export const DetalhesTrechoScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { trechoId } = route.params || {};
  const { trechos, registrarRocadaConcluida } = useApp();

  // Estado visual local para feedback imediato
  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  // Busca o trecho atualizado do estado global
  const trecho = trechos.find((t) => t.id === trechoId);

  if (!trecho) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.erroTexto}>Trecho não localizado.</Text>
      </SafeAreaView>
    );
  }

  const handleConcluirRocada = () => {
    console.log('>>> [ROÇA.AI] Registrando roçada para o trecho:', trecho.id);
    registrarRocadaConcluida(trecho.id);
    setMensagemSucesso(true);
  };

  const isCritico = trecho.status === 'critico';
  const isAtencao = trecho.status === 'atencao';
  const isConforme = trecho.status === 'normal';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollConteudo}>
        
        {/* Banner de Sucesso Imediato */}
        {mensagemSucesso && (
          <View style={styles.sucessoBanner}>
            <Text style={styles.sucessoBannerTitulo}>🎉 Baixa Registrada com Sucesso!</Text>
            <Text style={styles.sucessoBannerTexto}>
              A vegetação foi reduzida para 5.0 cm. O trecho agora está em conformidade contratual.
            </Text>
          </View>
        )}

        {/* Card Regulatório ARTESP */}
        <View
          style={[
            styles.alertaCard,
            isCritico && styles.alertaCritico,
            isAtencao && styles.alertaAtencao,
            isConforme && styles.alertaNormal,
          ]}
        >
          <Text style={styles.alertaTitulo}>
            {isCritico
              ? '⚠️ RISCO REGULATÓRIO ARTESP'
              : isAtencao
              ? '⚡ PONTO DE ATENÇÃO PREDITIVO'
              : '✅ EM CONFORMIDADE CONTRATUAL'}
          </Text>
          <Text style={styles.alertaDescricao}>
            {isCritico
              ? 'Vegetação acima de 30 cm sujeita a penalidade e multa contratual. Intervenção prioritária necessária.'
              : isAtencao
              ? 'Crescimento em ritmo acelerado. Projeção de atingir o limite regulatório em poucos dias.'
              : 'Trecho dentro dos padrões exigidos pela concessionária e órgãos fiscalizadores (< 10cm).'}
          </Text>
        </View>

        {/* Informações Gerais do Trecho */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Identificação do Trecho</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rodovia:</Text>
            <Text style={styles.infoValor}>{trecho.rodovia}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Extensão:</Text>
            <Text style={styles.infoValor}>KM {trecho.kmInicial} ao {trecho.kmFinal}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sentido:</Text>
            <Text style={styles.infoValor}>{trecho.sentido}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Última Inspeção:</Text>
            <Text style={styles.infoValor}>{trecho.ultimaInspecao}</Text>
          </View>
        </View>

        {/* Telemetria e Predição */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Telemetria da Vegetação</Text>
          <View style={styles.metricasBox}>
            <View style={styles.metricaBloco}>
              <Text
                style={[
                  styles.metricaNumero,
                  isCritico && { color: cores.status.critico.texto },
                  isConforme && { color: cores.status.normal.texto },
                ]}
              >
                {trecho.alturaVegetacao.toFixed(1)} cm
              </Text>
              <Text style={styles.metricaSub}>Altura Atual</Text>
            </View>
            <View style={styles.metricaBloco}>
              <Text style={styles.metricaNumero}>
                {trecho.diasParaLimite === 0 ? 'Excedido' : `${trecho.diasParaLimite} dias`}
              </Text>
              <Text style={styles.metricaSub}>Previsão Limite (30cm)</Text>
            </View>
          </View>
        </View>

        {/* Botão de Ação: Baixa Operacional */}
        {isConforme ? (
          <View style={styles.btnDesabilitado}>
            <Text style={styles.btnDesabilitadoTexto}>{'✅ Trecho Regularizado (< 10 cm)'}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.btnConcluir}
            activeOpacity={0.8}
            onPress={handleConcluirRocada}
          >
            <Text style={styles.btnConcluirTexto}>✂️ Registrar Roçada Concluída</Text>
          </TouchableOpacity>
        )}

        {/* Botão para Retornar ao Painel */}
        <TouchableOpacity
          style={styles.btnVoltar}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.btnVoltarTexto}>← Voltar ao Painel Geral</Text>
        </TouchableOpacity>

        {/* Histórico de Intervenções */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Histórico de Intervenções</Text>
          {trecho.historico.length === 0 ? (
            <Text style={styles.historicoVazio}>Nenhuma intervenção registrada recentemente.</Text>
          ) : (
            trecho.historico.map((h) => (
              <View key={h.id} style={styles.historicoItem}>
                <View style={styles.historicoHeader}>
                  <Text style={styles.historicoServico}>{h.servico}</Text>
                  <Text style={styles.historicoData}>{h.data}</Text>
                </View>
                <Text style={styles.historicoDetalhe}>
                  Responsável: {h.responsavel} • Altura pós-corte: {h.alturaApos} cm
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetalhesTrechoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  scrollConteudo: { padding: 16, gap: 16 },
  erroTexto: { textAlign: 'center', marginTop: 40, color: cores.texto.secundario },
  
  sucessoBanner: {
    backgroundColor: '#DEF7EC',
    borderColor: '#31C48D',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 14,
  },
  sucessoBannerTitulo: { fontSize: 14, fontWeight: 'bold', color: '#03543F' },
  sucessoBannerTexto: { fontSize: 12, color: '#046C4E', marginTop: 4 },

  alertaCard: { padding: 14, borderRadius: 10, borderWidth: 1 },
  alertaCritico: { backgroundColor: cores.status.critico.fundo, borderColor: cores.status.critico.borda },
  alertaAtencao: { backgroundColor: cores.status.atencao.fundo, borderColor: cores.status.atencao.borda },
  alertaNormal: { backgroundColor: cores.status.normal.fundo, borderColor: cores.status.normal.borda },
  alertaTitulo: { fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
  alertaDescricao: { fontSize: 12, color: cores.texto.primario, lineHeight: 16 },
  secao: {
    backgroundColor: cores.superficie,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  secaoTitulo: { fontSize: 15, fontWeight: 'bold', color: cores.texto.primario, marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  infoLabel: { fontSize: 13, color: cores.texto.secundario },
  infoValor: { fontSize: 13, fontWeight: '600', color: cores.texto.primario },
  metricasBox: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 8 },
  metricaBloco: { alignItems: 'center' },
  metricaNumero: { fontSize: 22, fontWeight: 'bold', color: cores.primaria },
  metricaSub: { fontSize: 12, color: cores.texto.secundario, marginTop: 2 },
  
  btnConcluir: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    cursor: 'pointer' as any,
  },
  btnConcluirTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  
  btnDesabilitado: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnDesabilitadoTexto: { color: '#065F46', fontWeight: 'bold', fontSize: 14 },

  btnVoltar: {
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    cursor: 'pointer' as any,
  },
  btnVoltarTexto: { color: cores.primaria, fontWeight: '600', fontSize: 13 },

  historicoVazio: { fontSize: 12, color: cores.texto.secundario, fontStyle: 'italic' },
  historicoItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: cores.borda,
  },
  historicoHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  historicoServico: { fontSize: 13, fontWeight: 'bold', color: cores.texto.primario },
  historicoData: { fontSize: 11, color: cores.texto.secundario },
  historicoDetalhe: { fontSize: 12, color: cores.texto.secundario, marginTop: 2 },
});