# Documento de Testes Manuais — Sprint 3

**Projeto:** ROÇA.AI Viário — Monitoramento e Manutenção Preditiva (SP-021)  
**Ambiente de Teste:** Emulador Android / Dispositivo Móvel (Expo Go) / Web  
**Demonstração em Vídeo:** [https://youtu.be/cqq3-ENDleY](https://youtu.be/cqq3-ENDleY)  

**Integrantes / Responsáveis:**
* Davi Xavier — RM563572
* Felipe Ramalho — RM565073
* Gabriel Pereira — RM563571
* Gabriel Simioni — RM563475
* Guilherme Vega — RM562655
* Luiz Henrique — RM563795

---

## Tabela de Casos de Testes dos Fluxos Principais

| ID | Fluxo / Funcionalidade | Cenário / Procedimento Testado | Resultado Esperado | Resultado Obtido | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **CT-01** | **Filtragem por Criticidade** (Home) | 1. Acessar a tela inicial.<br>2. Clicar no filtro "Críticos".<br>3. Alternar para "Normais". | A lista deve exibir exclusivamente os trechos com a severidade selecionada. | Filtros aplicados em tempo real, exibindo apenas trechos correspondentes. | **Passou** |
| **CT-02** | **Tratamento de Lista Vazia** (Empty State) | 1. Digitar "KM 999" na barra de busca.<br>2. Clicar no botão "Limpar Filtros". | Exibir layout amigável de lista vazia sem quebra visual e restaurar a lista ao limpar. | Mensagem ilustrada exibida corretamente com restauração imediata. | **Passou** |
| **CT-03** | **Inspeção e Detalhes do Trecho** | 1. Selecionar o trecho "KM 12.0 ao 14.5".<br>2. Conferir alertas e telemetria. | Exibir telemetria (altura, dias para limite) e alerta regulatório ARTESP (>30cm). | Dados carregados fielmente com destaque do risco regulatório. | **Passou** |
| **CT-04** | **Validação de Erro em Formulário** | 1. Abrir "+ Ocorrência".<br>2. Tentar salvar com campos obrigatórios vazios. | O sistema deve bloquear o envio e exibir mensagens de erro em vermelho. | Envio bloqueado e mensagens de validação exibidas nos campos KM e Descrição. | **Passou** |
| **CT-05** | **Baixa Operacional / Resolução** | 1. No trecho crítico, clicar em "Registrar Roçada Concluída".<br>2. Voltar à Home. | A altura deve cair para 5 cm, o trecho mudar para Verde (Normal) e refletir na Home. | Estado atualizado em tempo real no contexto global sem inconsistências. | **Passou** |

---

### Conclusão dos Testes
* **Total de Testes:** 5
* **Aprovados:** 5
* **Falhas:** 0
* **Taxa de Sucesso:** 100%
