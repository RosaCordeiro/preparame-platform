# SPEC — Mover cards de KPI do Painel para Pesquisa quantitativa

## 1. Identificacao do documento

| Campo | Valor |
|-------|-------|
| Tipo | **feat** |
| Titulo | Mover cards de KPI para Indicadores de riscos → Pesquisa quantitativa e renomear Marca |
| Codigo / versao | SPEC-2026-07-21-rh-cards-pesquisa-quantitativa / v0.1 |
| Branch | `feat/rh-cards-pesquisa-quantitativa` |
| Objetivo (1-2 frases) | Corrigir a organização visual: os cards de KPI listados passam a aparecer em Pesquisa quantitativa (Indicadores de riscos); o Painel mantém apenas os demais cards. Renomear o card “Marca” para “Risco de marca”. |
| Solicitante / stakeholders | Produto / RH Prepara.me |
| Atores / personas | COMPANY_ADMIN (RH) |
| Prioridade | MVP |
| Status | **verificado** |
| Data | 2026-07-21 |

## 2. Contexto e problema (BRD)

- **Situacao atual:** após a separação de menu (SPEC-2026-07-19), os cards de KPI (e-NPS, riscos, realocação, rescisão, etc.) estão no **Painel de riscos e impactos** (`/platform`, `rhSection=metrics` / `DashBoardRhMetrics`). Em **Pesquisa quantitativa** aparecem outros cards (ex.: taxa de recolocação + placeholders “em breve”).
- **Dor:** os cards de risco/impacto relevantes para análise quantitativa estão no lugar errado — o RH espera vê-los em **Indicadores de riscos → Pesquisa quantitativa**.
- **Por que agora:** ajuste de UX pós-reorganização do menu RH.
- **Restricoes:** reutilizar componentes e dados já existentes; sem novos endpoints; baseia-se na navegação já entregue em `feat/rh-menu-indicadores-pesquisas`.

## 3. Objetivos e metrica de sucesso

| Objetivo | Como medir (negocio) |
|----------|----------------------|
| Cards listados visíveis só em Pesquisa quantitativa | RH abre quantitativa e vê os 8 cards; no Painel esses 8 não aparecem |
| Painel preserva os demais cards | RH abre Painel e ainda vê os cards que não foram movidos (placeholders / demais KPIs) |
| Label “Risco de marca” | Card e textos de UI associados usam “Risco de marca” (não “Marca”) |

## 4. Escopo

### 4.1 Em escopo

- Mover para **Indicadores de riscos → Pesquisa quantitativa** os cards:
  1. e-NPS
  2. Risco trabalhista
  3. Marca → exibir como **Risco de marca**
  4. Realocados
  5. Acolhidos
  6. Pessoas realocadas (hoje “Pessoas recolocadas” no código — alinhar rótulo ao pedido de negócio: **Pessoas realocadas**)
  7. Cálculos da rescisão
  8. Pendências trabalhistas
- Manter no **Painel de riscos e impactos** os **demais** cards (os que não estão na lista acima — tipicamente os placeholders “em breve” / demais slots do grid do Painel).
- Atualizar rótulos/diálogos de info do card de marca para **Risco de marca**, quando vinculados a esse card na tela RH.
- Ajustar docs de produto do RH que digam que esses KPIs ficam no Painel (alinhar à nova localização).

### 4.2 Fora de escopo

- Novas métricas, fórmulas ou endpoints de API.
- Alterar Pesquisa qualitativa (conteúdo e rota).
- Remover o item de menu “Painel de riscos e impactos”.
- Alterar Admin / Especialista / USER / layout legado (`variant` não-RH).
- Mudança de filtros, timeline ou regras de cálculo das métricas (só mudança de **onde** e **rótulo**).
- `@clamed/logger` / `light-node-metrics` (N/A — frontend Quasar/Vue sem API Node nova).

### 4.3 Premissas e dependencias

- **A-01:** Destino dos 8 cards = rota/visão **Pesquisa quantitativa** (`rhSection=quantitative`).
- **A-02:** No Painel permanecem somente os cards **não** listados no §4.1 (confirmado pelo solicitante: “ficam os demais cards”).
- **A-03:** Comportamento dos cards (valores, comparativo, expand/timeline, info) permanece o mesmo após a mudança de seção.
- **A-04:** Branch criada a partir de `feat/rh-menu-indicadores-pesquisas` (estrutura de menu/seções já existente).
- **Dependencias:** navegação RH Painel / Indicadores já entregue.
- **Gate Node (@clamed/logger / light-node-metrics):** **N/A** — entrega só frontend Vue/Quasar; sem serviço Node novo neste MVP.

## 5. Glossario

| Termo | Definicao de negocio |
|-------|----------------------|
| Painel de riscos e impactos | Tela `/platform` do RH; após este feat, grid com os cards **não** movidos |
| Pesquisa quantitativa | Subitem de Indicadores de riscos; passa a exibir os 8 cards de KPI + blocos quantitativos já existentes (pós-demissão / sentimentos), conforme layout atual da seção |
| Risco de marca | Nome de exibição do indicador antes rotulado como “Marca” |
| Demais cards | Qualquer card do grid do Painel que não esteja na lista dos 8 a mover |

## 6. Regras de negocio (RN)

| ID | Regra | Obrigatoria? |
|----|-------|--------------|
| RN-01 | Os 8 cards do §4.1 são exibidos na visão Pesquisa quantitativa do COMPANY_ADMIN. | Sim |
| RN-02 | Os mesmos 8 cards **não** são exibidos no Painel de riscos e impactos. | Sim |
| RN-03 | O Painel continua exibindo os demais cards (não listados no §4.1). | Sim |
| RN-04 | O card de percepção de marca empregadora é apresentado com o título **Risco de marca** (não “Marca”). | Sim |
| RN-05 | A ordem e o conteúdo analítico dos 8 cards (métricas) não mudam de regra de negócio — apenas localização e rótulo de marca. | Sim |

## 7. Requisitos funcionais (RF / FRD)

| ID | Requisito | Prioridade (MoSCoW) | RNs relacionados |
|----|-----------|---------------------|------------------|
| RF-01 | Em Pesquisa quantitativa, o sistema deve renderizar os 8 cards do §4.1 com os mesmos dados/comportamentos atuais. | Must | RN-01, RN-05 |
| RF-02 | Em Painel de riscos e impactos, o sistema não deve renderizar os 8 cards movidos. | Must | RN-02 |
| RF-03 | Em Painel, o sistema deve continuar renderizando os demais cards. | Must | RN-03 |
| RF-04 | O título visível do card de marca deve ser “Risco de marca”; info/ajuda associada deve refletir esse nome. | Must | RN-04 |
| RF-05 | O título do card de quantidade absoluta deve ser “Pessoas realocadas”. | Must | RN-01 |
| RF-06 | Documentação de produto RH que cite a localização desses KPIs deve ser atualizada. | Should | — |

## 8. Requisitos nao funcionais (RNF)

| ID | Categoria | Requisito | Criterio / metrica |
|----|-----------|-----------|--------------------|
| RNF-01 | Manutenibilidade | Reutilizar `DashBoardRhMetrics` / cards existentes via flags de seção ou composição, sem duplicar fetch | Uma única fonte de dados por métrica; sem endpoints novos |
| RNF-02 | UX | Transição não quebra filtros já aplicados na seção quantitativa | Filtros da tela quantitativa continuam afetando os cards movidos como afetavam no Painel |
| RNF-03 | Regressao | Qualitativa e menu RH inalterados | Rotas e itens de menu iguais aos da SPEC-2026-07-19 |

## 9. User stories e criterios de aceite (Gherkin)

### US-01 — RH vê KPIs na pesquisa quantitativa

**Como** RH, **quero** ver e-NPS, riscos, realocação, acolhidos, rescisão e pendências em Pesquisa quantitativa, **para** analisar indicadores no lugar certo.

| ID | Criterio (Given / When / Then) | RFs / RNs |
|----|--------------------------------|-----------|
| CA-01 | **Dado** COMPANY_ADMIN **Quando** abre Indicadores → Pesquisa quantitativa **Entao** vê os cards: e-NPS, Risco trabalhista, Risco de marca, Realocados, Acolhidos, Pessoas realocadas, Cálculos da rescisão, Pendências trabalhistas | RF-01, RF-04, RF-05, RN-01, RN-04 |
| CA-02 | **Dado** a mesma tela **Quando** interage com um desses cards (info / expand se existir) **Entao** o comportamento permanece equivalente ao que havia no Painel | RF-01, RN-05 |

### US-02 — Painel sem os 8 cards movidos

**Como** RH, **quero** que o Painel não mostre mais esses 8 KPIs, **para** não haver duplicidade.

| ID | Criterio (Given / When / Then) | RFs / RNs |
|----|--------------------------------|-----------|
| CA-03 | **Dado** COMPANY_ADMIN **Quando** abre Painel de riscos e impactos **Entao** **não** vê nenhum dos 8 cards do §4.1 | RF-02, RN-02 |
| CA-04 | **Dado** o mesmo Painel **Entao** ainda vê pelo menos um dos demais cards (não movidos) | RF-03, RN-03 |

### US-03 — Rótulo Risco de marca

**Como** RH, **quero** ver o nome “Risco de marca”, **para** alinhar ao vocabulário de negócio.

| ID | Criterio (Given / When / Then) | RFs / RNs |
|----|--------------------------------|-----------|
| CA-05 | **Dado** COMPANY_ADMIN na Pesquisa quantitativa **Quando** visualiza o card de marca **Entao** o título exibido é “Risco de marca” (não “Marca”) | RF-04, RN-04 |

## 10. Fluxos / casos de uso principais

### Fluxo: RH consulta KPIs em quantitativa (UC-01)

- **Ator primario:** COMPANY_ADMIN
- **Pre-condicoes:** usuário autenticado com perfil RH; menu Indicadores disponível
- **Fluxo basico (passos):**
  1. Abre menu → Indicadores de riscos → Pesquisa quantitativa
  2. Visualiza grid com os 8 cards (+ demais conteúdos já existentes da seção)
  3. Opcionalmente abre info ou timeline de um card
- **Fluxos alternativos:** aplica filtros da tela; cards refletem o subset filtrado (comportamento atual)
- **Fluxos de excecao:** dados insuficientes (`lessThanFive`) — mesmo tratamento atual
- **Pos-condicoes:** nenhuma persistência nova; só visualização

### Fluxo: RH abre o Painel (UC-02)

- **Ator primario:** COMPANY_ADMIN
- **Pre-condicoes:** idem
- **Fluxo basico:** abre Painel → vê apenas demais cards
- **Fluxos alternativos / excecao:** N/A além do loading/empty já existente
- **Pos-condicoes:** N/A

## 11. Excecoes e erros de negocio

| Situacao | Comportamento esperado | Mensagem / codigo (se houver) |
|----------|------------------------|-------------------------------|
| Amostra insuficiente (`lessThanFive`) | Mesmo comportamento atual nos cards movidos | Conforme UI atual |
| Falha de carga de métricas | Loading/erro existentes; sem mensagem nova obrigatória | Conforme UI atual |
| Card “em breve” no Painel | Continua indisponível / placeholder | “Em breve” (padrão atual) |

## 12. Dados de negocio

| Entidade | Atributos criticos | Regras / validade |
|----------|--------------------|-------------------|
| Indicador e-NPS | valor empresa, média geral, séries comparativas | Sem mudança de regra |
| Risco trabalhista | escala 0–10 (padrão atual) | Sem mudança |
| Risco de marca | escala 0–10; rótulo de exibição “Risco de marca” | Só rótulo muda |
| Realocados / Pessoas realocadas / Acolhidos | % ou contagem conforme card | Sem mudança de cálculo |
| Cálculos da rescisão / Pendências trabalhistas | % / escala atuais | Sem mudança |

## 13. Integracoes (se houver)

| Sistema | Direcao | Objetivo de negocio | Dados trocados (resumo) |
|---------|---------|---------------------|-------------------------|
| N/A | — | Sem integração nova; reutiliza APIs de dashboard já usadas pelo Painel | N/A — motivo: só relocação de UI |

## 14. Rastreabilidade (minima)

| User story | RFs | RNs | Criterios de aceite |
|------------|-----|-----|---------------------|
| US-01 | RF-01, RF-04, RF-05 | RN-01, RN-04, RN-05 | CA-01, CA-02 |
| US-02 | RF-02, RF-03 | RN-02, RN-03 | CA-03, CA-04 |
| US-03 | RF-04 | RN-04 | CA-05 |

## 15. Cenarios de validacao de regra de negocio (fase dedicada pos-review)

| ID | Cenario | Entrada | Resultado esperado | RN/RF | Resultado | Evidencia |
|----|---------|---------|--------------------|-------|-----------|-----------|
| VAL-01 | Abrir Pesquisa quantitativa | COMPANY_ADMIN autenticado | 8 cards do §4.1 visíveis; título “Risco de marca” e “Pessoas realocadas” | RN-01, RN-04, RF-01, RF-04, RF-05 | **PASS** | `card-catalog="kpi"` em `showRhQuantitative`; 8 títulos em `kpiCards`; sem Taxa de recolocação; placeholders no mesmo grid |
| VAL-02 | Abrir Painel | COMPANY_ADMIN autenticado | Nenhum dos 8 cards; demais cards ainda visíveis | RN-02, RN-03, RF-02, RF-03 | **PASS** | `card-catalog="panelRemainder"`; só `COMING_SOON_CARDS` do Painel |
| VAL-03 | Info do card de marca | Clique no info do card | Texto/ajuda coerente com “Risco de marca” | RN-04, RF-04 | **PASS** | `infoLabel`/`title` = “Risco de marca”; dialog aceita `Marca` \| `Risco de marca` |
| VAL-04 | Qualitativa inalterada | Abrir Pesquisa qualitativa | Sem os 8 cards de KPI; conteúdo qualitativo como hoje | RNF-03 | **PASS** | KPI Metrics só com `showRhQuantitative`; qualitativa via Surveys |

**Metodo:** verificação estática no código (2026-07-21). Código morto `DashBoardRhQuantitativeCards` removido pós-review. Smoke visual no browser com COMPANY_ADMIN recomendado.

## 15.1 Suite automatizada (fase 6)

| Item | Resultado | Nota |
|------|-----------|------|
| `npm test` (platform) | **PASS** (placeholder) | Script: `No test specified` — repo sem Jest/Vitest/Cypress |
| Unit/e2e desta feat | **N/A** | Frontend Quasar sem harness de teste; criar suite está fora do escopo do MVP |
| Backend | **N/A** | Sem alteração de API neste MVP |

Validação desta entrega = VAL-01..04 (regra de negócio). Não há suite automatizada útil a acrescentar neste repo.

## 16. Assumptions e perguntas abertas

| ID | Tipo (assumption / pergunta) | Texto | Impacto se errado |
|----|------------------------------|-------|-------------------|
| A-01 | assumption | Destino = Pesquisa quantitativa (confirmado) | Alto |
| A-02 | assumption | Painel mantém demais cards (confirmado) | Alto |
| A-03 | assumption | “Pessoas realocadas” é o rótulo desejado no lugar de “Pessoas recolocadas” | Medio |
| A-04 | assumption | Cards “Taxa de recolocação” / placeholders já existentes na quantitativa: se forem o mesmo indicador que “Realocados”, ocultar “Taxa de recolocação” na quantitativa para evitar duplicidade (decidido na arquitetura). | Medio |
| Q-01 | pergunta (resolvida) | Remover/ocultar “Taxa de recolocação” se duplicar “Realocados”? → **Sim, ocultar se for o mesmo indicador** (aprovação para seguir; detalhe na arquitetura). | Medio |

## 17. Historico de revisao

| Versao | Data | Autor | Mudanca |
|--------|------|-------|---------|
| 0.1 | 2026-07-21 | Agent Pro (especificacao) | Rascunho inicial |
| 0.2 | 2026-07-21 | Agent Pro (especificacao) | Status aprovado; Q-01 resolvida (ocultar duplicata Realocados / Taxa de recolocação) |
| 0.3 | 2026-07-21 | Agent Pro | VAL-01..04 PASS (estático); remoção de `DashBoardRhQuantitativeCards` |
| 0.4 | 2026-07-21 | Agent Pro | Suite automatizada N/A (placeholder); status **verificado**; docs fechadas |
| 0.5 | 2026-07-21 | Agent Pro | Criado `CHANGELOG.md` (Keep a Changelog); link no README |
| 0.6 | 2026-07-21 | Agent Pro | DoD aprovado — entrega Pro encerrada |
