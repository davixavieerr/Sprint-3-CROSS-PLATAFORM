import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { NivelCriticidade } from '../mock/dadosMock';
import { cores } from '../theme/cores';

export const NovaOcorrenciaScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { trechos, adicionarOcorrencia } = useApp();

  const [trechoId, setTrechoId] = useState(trechos[0]?.id || '');
  const [km, setKm] = useState('');
  const [tipo, setTipo] = useState('Obstrução de Sinalização (>30cm)');
  const [descricao, setDescricao] = useState('');
  const [severidade, setSeveridade] = useState<NivelCriticidade>('critico');

  // Estados de erro para validação
  const [erroKm, setErroKm] = useState('');
  const [erroDescricao, setErroDescricao] = useState('');

  const tiposDisponiveis = [
    'Obstrução de Sinalização (>30cm)',
    'Vegetação Invadindo Acostamento',
    'Crescimento Acelerado em Talude',
    'Acúmulo de Resíduos na Faixa',
  ];

  const handleSalvar = () => {
    let temErro = false;

    // Validação do campo KM
    if (!km.trim() || isNaN(Number(km.replace(',', '.')))) {
      setErroKm('Informe um quilômetro válido (ex: 13.5)');
      temErro = true;
    } else {
      setErroKm('');
    }

    // Validação da descrição
    if (descricao.trim().length < 5) {
      setErroDescricao('A descrição deve ter no mínimo 5 caracteres.');
      temErro = true;
    } else {
      setErroDescricao('');
    }

    if (temErro) {
      return;
    }

    // Gravação no contexto global
    adicionarOcorrencia({
      trechoId,
      km: parseFloat(km.replace(',', '.')),
      tipo,
      descricao,
      severidade,
    });

    // Retorna direto para a Home sem travar em pop-ups
    navigation.goBack();

    // Tratamento para Web
    if (Platform.OS === 'web') {
      (globalThis as any).alert('Ocorrência Registrada com Sucesso! Evidência sincronizada com a malha da SP-021.');
      navigation.goBack();
      return;
    }

    // Tratamento para Celular / Emulador
    Alert.alert(
      'Ocorrência Registrada',
      'O registro foi armazenado localmente e sincronizado na malha.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollConteudo}>
        <Text style={styles.titulo}>Registro de Vistoria em Campo</Text>
        <Text style={styles.subtitulo}>Preencha as evidências para despacho da equipe de corte.</Text>

        {/* Seleção do Trecho */}
        <View style={styles.campoGrupo}>
          <Text style={styles.rotulo}>Trecho da SP-021</Text>
          <View style={styles.opcoesContainer}>
            {trechos.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[styles.opcaoBtn, trechoId === t.id && styles.opcaoBtnAtivo]}
                onPress={() => setTrechoId(t.id)}
              >
                <Text style={[styles.opcaoTexto, trechoId === t.id && styles.opcaoTextoAtivo]}>
                  KM {t.kmInicial} - {t.kmFinal}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Campo KM com Validação */}
        <View style={styles.campoGrupo}>
          <Text style={styles.rotulo}>Quilômetro Exato do Ponto *</Text>
          <TextInput
            style={[styles.input, erroKm !== '' && styles.inputErro]}
            placeholder="Ex: 13.4"
            placeholderTextColor={cores.texto.secundario}
            keyboardType="numeric"
            value={km}
            onChangeText={(v) => {
              setKm(v);
              if (erroKm) setErroKm('');
            }}
          />
          {erroKm !== '' && <Text style={styles.textoErro}>{erroKm}</Text>}
        </View>

        {/* Tipo de Ocorrência */}
        <View style={styles.campoGrupo}>
          <Text style={styles.rotulo}>Tipo de Ocorrência</Text>
          <View style={styles.listaTipos}>
            {tiposDisponiveis.map((tp) => (
              <TouchableOpacity
                key={tp}
                style={[styles.tipoBtn, tipo === tp && styles.tipoBtnAtivo]}
                onPress={() => setTipo(tp)}
              >
                <Text style={[styles.tipoTexto, tipo === tp && styles.tipoTextoAtivo]}>{tp}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nível de Severidade */}
        <View style={styles.campoGrupo}>
          <Text style={styles.rotulo}>Severidade Regulamentar</Text>
          <View style={styles.severidadeContainer}>
            {(['critico', 'atencao', 'normal'] as NivelCriticidade[]).map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.severidadeBtn, severidade === s && styles.severidadeBtnAtivo]}
                onPress={() => setSeveridade(s)}
              >
                <Text
                  style={[
                    styles.severidadeTexto,
                    severidade === s && styles.severidadeTextoAtivo,
                  ]}
                >
                  {s.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Descrição com Validação */}
        <View style={styles.campoGrupo}>
          <Text style={styles.rotulo}>Observações e Evidências *</Text>
          <TextInput
            style={[styles.input, styles.textArea, erroDescricao !== '' && styles.inputErro]}
            placeholder="Detalhe a situação observada (ex: capim obstruindo placa regulamentar no acostamento)"
            placeholderTextColor={cores.texto.secundario}
            multiline
            numberOfLines={4}
            value={descricao}
            onChangeText={(v) => {
              setDescricao(v);
              if (erroDescricao) setErroDescricao('');
            }}
          />
          {erroDescricao !== '' && <Text style={styles.textoErro}>{erroDescricao}</Text>}
        </View>

        {/* Botão de Envio */}
        <TouchableOpacity style={styles.btnSalvar} activeOpacity={0.8} onPress={handleSalvar}>
          <Text style={styles.btnSalvarTexto}>Salvar e Sincronizar Ocorrência</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovaOcorrenciaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  scrollConteudo: { padding: 16, gap: 16 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: cores.texto.primario },
  subtitulo: { fontSize: 13, color: cores.texto.secundario },
  campoGrupo: { gap: 6 },
  rotulo: { fontSize: 13, fontWeight: '600', color: cores.texto.primario },
  input: {
    backgroundColor: cores.superficie,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 12,
    height: 44,
    color: cores.texto.primario,
  },
  inputErro: { borderColor: cores.status.critico.borda, borderWidth: 1.5 },
  textoErro: { fontSize: 12, color: cores.status.critico.texto, fontWeight: '500' },
  textArea: { height: 90, textAlignVertical: 'top', paddingTop: 10 },
  opcoesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  opcaoBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  opcaoBtnAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  opcaoTexto: { fontSize: 12, color: cores.texto.secundario },
  opcaoTextoAtivo: { color: '#FFF', fontWeight: 'bold' },
  listaTipos: { gap: 6 },
  tipoBtn: {
    padding: 10,
    backgroundColor: cores.superficie,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  tipoBtnAtivo: { backgroundColor: '#EFF6FF', borderColor: cores.primaria },
  tipoTexto: { fontSize: 13, color: cores.texto.primario },
  tipoTextoAtivo: { fontWeight: 'bold', color: cores.primaria },
  severidadeContainer: { flexDirection: 'row', gap: 8 },
  severidadeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  severidadeBtnAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  severidadeTexto: { fontSize: 11, fontWeight: 'bold', color: cores.texto.secundario },
  severidadeTextoAtivo: { color: '#FFF' },
  btnSalvar: {
    backgroundColor: cores.primaria,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  btnSalvarTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
});