# ROÇA.AI Viário — Sprint 3 (Protótipo Funcional Completo)

Aplicativo mobile multiplataforma desenvolvido para fiscalização e gestão preditiva de vegetação na rodovia **SP-021 (Rodoanel Mário Covas)**, em atendimento às normas regulatórias da ARTESP e padrões operacionais da concessionária CCR Motiva.

---

## 👥 Integrantes do Projeto

* Davi Xavier — RM563572
* Felipe Ramalho — RM565073
* Gabriel Pereira — RM563571
* Gabriel Simioni — RM563475
* Guilherme Vega — RM562655
* Luiz Henrique — RM563795

---

## 🎬 Demonstração em Vídeo

* **Vídeo no YouTube (Não Listado):** [Assista à demonstração de até 3 minutos](https://youtu.be/cqq3-ENDleY)

---

## 📱 Decisões Técnicas de Arquitetura

* **Framework:** React Native com Expo e TypeScript.
* **Justificativa da Stack:** A equipe optou por consolidar e manter o ecossistema React Native/TypeScript em vez de migrar para Flutter. A decisão baseou-se no reaproveitamento dos componentes construídos nas Sprints anteriores, alta estabilidade de desenvolvimento, tipagem estática e suporte nativo ao Expo Go para testes rápidos em dispositivos físicos sem atrito de compilação.
* **Gerenciamento de Estado:** React Context API (`AppContext`) com atualização em tempo real entre telas.
* **Navegação:** React Navigation (Stack Navigator) com passagem de parâmetros tipada.

---

## 📊 Status das Funcionalidades da Sprint 3

| Funcionalidade | Status | Observação |
| :--- | :---: | :--- |
| **Painel de Trechos (Home)** | Concluído | Listagem georreferenciada da SP-021 km a km |
| **Filtros por Criticidade** | Concluído | Normal (<10cm), Atenção (10-30cm) e Crítico (>30cm) |
| **Busca Dinâmica por KM** | Concluído | Busca textual em tempo real |
| **Tratamento de Lista Vazia** | Concluído | Empty State informativo com botão de reset |
| **Detalhes do Trecho** | Concluído | Telemetria, histórico de cortes e alerta ARTESP |
| **Baixa Operacional de Roçada** | Concluído | Resolução de trecho crítico revertendo status para Normal |
| **Registro de Ocorrência** | Concluído | Formulário completo com validação de erros em vermelho |
| **Identidade Visual** | Concluído | Logotipo institucional, cores semânticas e Favicon |

---

## 📋 Documento de Testes Manuais
Os resultados detalhados dos testes dos 5 fluxos principais encontram-se documentados no arquivo [`TESTES.md`](./TESTES.md).

---

## 🔍 Pendências Identificadas e Plano para a Sprint 4

### Pendências Identificadas
1. **Persistência de Dados Local (Offline-First):** Os dados atuais estão centralizados na memória do `AppContext`. Para operação em rodovias com sinal oscilante, é necessário armazenamento local persistente (ex.: SQLite ou AsyncStorage).
2. **Integração com Backend Real:** Substituição gradual da camada de mock por chamadas a uma API REST com banco de dados PostgreSQL/PostGIS.
3. **Câmera e GPS Nativos:** Integração com os módulos nativos de câmera (`expo-camera`) e geolocalização precisa (`expo-location`) em campo.

### Plano de Ajustes para a Sprint 4
1. Implementação de banco de dados SQLite local para garantir sincronização bidirecional offline.
2. Consumo de API REST para envio e recebimento de vistorias reais da concessionária.
3. Refinamento de testes automatizados e empacotamento da build final (APK/AAB).

---

## 🚀 Como Executar o Projeto

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor Expo
npx expo start
Pressione a para abrir no emulador Android.

Escaneie o QR Code com o app Expo Go no seu celular físico.

Pressione w para abrir no navegador web.
