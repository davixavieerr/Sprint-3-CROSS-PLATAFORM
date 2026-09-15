import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Trecho, NivelCriticidade } from '../mock/dadosMock';
import { cores } from '../theme/cores';

type Filtro = 'todos' | NivelCriticidade;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { trechos } = useApp();

  const [busca, setBusca] = useState('');
  const [filtroAtivo, setFiltroAtivo] = useState<Filtro>('todos');

  const trechosFiltrados = trechos.filter((t) => {
    const matchFiltro = filtroAtivo === 'todos' ? true : t.status === filtroAtivo;
    const matchBusca =
      busca.trim() === '' ||
      t.rodovia.toLowerCase().includes(busca.toLowerCase()) ||
      t.kmInicial.toString().includes(busca) ||
      t.kmFinal.toString().includes(busca) ||
      `km ${t.kmInicial}`.toLowerCase().includes(busca.toLowerCase());
    return matchFiltro && matchBusca;
  });

  const getBadgeStyle = (status: NivelCriticidade) => {
    switch (status) {
      case 'critico':
        return { bg: cores.status.critico.fundo, text: cores.status.critico.texto, label: 'CRÍTICO (>30cm)' };
      case 'atencao':
        return { bg: cores.status.atencao.fundo, text: cores.status.atencao.texto, label: 'ATENÇÃO (10-30cm)' };
      default:
        return { bg: cores.status.normal.fundo, text: cores.status.normal.texto, label: 'NORMAL (<10cm)' };
    }
  };

  const renderCard = ({ item }: { item: Trecho }) => {
    const badge = getBadgeStyle(item.status);
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('DetalhesTrecho', { trechoId: item.id })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitulo}>{item.rodovia}</Text>
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeTexto, { color: badge.text }]}>{badge.label}</Text>
          </View>
        </View>

        <Text style={styles.cardSubtitulo}>
          KM {item.kmInicial.toFixed(1)} ao {item.kmFinal.toFixed(1)} • {item.sentido}
        </Text>

        <View style={styles.metricasContainer}>
          <View style={styles.metricaItem}>
            <Text style={styles.metricaRotulo}>Altura Vegetação</Text>
            <Text style={[styles.metricaValor, { color: badge.text }]}>
              {item.alturaVegetacao.toFixed(1)} cm
            </Text>
          </View>

          <View style={styles.metricaItem}>
            <Text style={styles.metricaRotulo}>Previsão Limite</Text>
            <Text style={styles.metricaValor}>
              {item.diasParaLimite === 0 ? 'Excedido' : `${item.diasParaLimite} dias`}
            </Text>
          </View>

          <View style={styles.metricaItem}>
            <Text style={styles.metricaRotulo}>Última Inspeção</Text>
            <Text style={styles.metricaValor}>{item.ultimaInspecao}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={cores.fundo} />

      {/* Header com Logo e Identificação */}
      <View style={styles.header}>
        <View style={styles.headerMarca}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.headerTitulo}>ROÇA.AI Viário</Text>
            <Text style={styles.headerSubtitulo}>Fiscalização CCR • SP-021</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnNovaOcorrencia}
          onPress={() => navigation.navigate('NovaOcorrencia')}
        >
          <Text style={styles.btnNovaOcorrenciaTexto}>+ Ocorrência</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de Busca */}
      <View style={styles.buscaContainer}>
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar por KM ou rodovia (ex: 14)"
          placeholderTextColor={cores.texto.secundario}
          value={busca}
          onChangeText={setBusca}
        />
        {busca !== '' && (
          <TouchableOpacity onPress={() => setBusca('')} style={styles.btnLimparBusca}>
            <Text style={styles.btnLimparTexto}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Chips de Filtro */}
      <View style={styles.filtrosContainer}>
        {(['todos', 'critico', 'atencao', 'normal'] as Filtro[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chipFiltro, filtroAtivo === f && styles.chipFiltroAtivo]}
            onPress={() => setFiltroAtivo(f)}
          >
            <Text style={[styles.chipTexto, filtroAtivo === f && styles.chipTextoAtivo]}>
              {f === 'todos'
                ? 'Todos'
                : f === 'critico'
                ? 'Críticos'
                : f === 'atencao'
                ? 'Atenção'
                : 'Normais'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Listagem com Empty State */}
      <FlatList
        data={trechosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listaConteudo}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcone}>🔍</Text>
            <Text style={styles.emptyTitulo}>Nenhum trecho encontrado</Text>
            <Text style={styles.emptyDescricao}>
              Não foram localizados trechos para os filtros e busca aplicados.
            </Text>
            <TouchableOpacity
              style={styles.btnResetarFiltros}
              onPress={() => {
                setBusca('');
                setFiltroAtivo('todos');
              }}
            >
              <Text style={styles.btnResetarTexto}>Limpar Filtros</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: cores.superficie,
    borderBottomWidth: 1,
    borderColor: cores.borda,
  },
  headerMarca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  headerSubtitulo: {
    fontSize: 11,
    color: cores.texto.secundario,
  },
  btnNovaOcorrencia: {
    backgroundColor: cores.primaria,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnNovaOcorrenciaTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: cores.superficie,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 12,
  },
  buscaInput: {
    flex: 1,
    height: 42,
    color: cores.texto.primario,
  },
  btnLimparBusca: {
    padding: 4,
  },
  btnLimparTexto: {
    fontSize: 14,
    color: cores.texto.secundario,
  },
  filtrosContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  chipFiltro: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  chipFiltroAtivo: {
    backgroundColor: cores.primaria,
    borderColor: cores.primaria,
  },
  chipTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.texto.secundario,
  },
  chipTextoAtivo: {
    color: '#FFFFFF',
  },
  listaConteudo: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.texto.primario,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTexto: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardSubtitulo: {
    fontSize: 13,
    color: cores.texto.secundario,
    marginTop: 4,
  },
  metricasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: cores.borda,
  },
  metricaItem: {
    alignItems: 'center',
  },
  metricaRotulo: {
    fontSize: 11,
    color: cores.texto.secundario,
  },
  metricaValor: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 2,
    color: cores.texto.primario,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIcone: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.texto.primario,
  },
  emptyDescricao: {
    fontSize: 13,
    color: cores.texto.secundario,
    textAlign: 'center',
    marginTop: 6,
  },
  btnResetarFiltros: {
    marginTop: 16,
    backgroundColor: cores.primaria,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnResetarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});