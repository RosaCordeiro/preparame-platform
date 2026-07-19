# SPEC — Menu RH: separar Painel e Indicadores (quantitativa / qualitativa)

## 1. Identificacao do documento

| Campo | Valor |
|-------|-------|
| Tipo | **feat** |
| Titulo | Separar menu e telas do RH: Painel vs Indicadores de Riscos (quantitativa / qualitativa) |
| Codigo / versao | SPEC-2026-07-19-rh-menu-indicadores / v0.1 |
| Branch | `feat/rh-menu-indicadores-pesquisas` (platform; backend N/A neste MVP) |
| Objetivo (1-2 frases) | Reorganizar a navegação do COMPANY_ADMIN para que o painel de riscos/impactos fique separado dos indicadores de pesquisa, e estes se dividam em quantitativa e qualitativa (somente consulta do que já existe no dashboard). |
| Solicitante / stakeholders | Produto / RH Prepara.me |
| Atores / personas | COMPANY_ADMIN (RH) |
| Prioridade | MVP |
| Status | **verificado** |
| Data | 2026-07-19 |

## 2. Contexto e problema (BRD)

- **Situacao atual:** o RH acessa `/platform` e vê **tudo junto** no `DashBoardAnswers` (métricas de risco + avaliação pós-demissão + mapa de sentimentos + respostas qualitativas). No menu, “Indicadores de Riscos” está como `comingSoon`.
- **Dor:** dificuldade de foco — querem navegar por tipo de conteúdo.
- **Por que agora:** pedido de organização do menu RH após ajustes de governança de perguntas.
- **Restricoes:** reutilizar dados/APIs/componentes já existentes; **não** recriar cadastro de perguntas qualitativas no RH (continua só Admin).

## 3. Objetivos e metrica de sucesso

| Objetivo | Como medir |
|----------|------------|
| Menu RH com Painel + Indicadores (submenu) | RH vê a estrutura e navega sem “em breve” nesses itens |
| Quantitativa e qualitativa em telas distintas | Cada rota mostra só o bloco correspondente |
| Mesmo conteúdo de hoje | Sem perda de gráficos/tabelas/respostas já existentes |

## 4. Escopo

### 4.1 Em escopo

- Menu `COMPANY_ADMIN`:
  - **Painel de riscos e impactos** → métricas agregadas (bloco atual de riscos/impactos / `DashBoardRhMetrics` e correlatos de KPI).
  - **Indicadores de riscos** → **item com submenu**:
    - **Pesquisa quantitativa** → avaliação pós-demissão + mapa de sentimentos (+ comparativos já existentes desses blocos).
    - **Pesquisa qualitativa** → respostas das perguntas da empresa (`CompanyQuestionsCard` / bloco “Perguntas da Empresa”).
- Suporte de UI de submenu no menu lateral RH (hoje o painel RH lista itens flat).
- Rotas dedicadas (ou query/modo) para cada visão, reaproveitando `DashBoardAnswers` / `HomeCompany` com flags de seção.
- Atualizar docs de produto do RH (menu / jornada).

### 4.2 Fora de escopo

- Novas métricas ou novos endpoints.
- Cadastro/edição de perguntas qualitativas pelo RH.
- Alterar Admin / Especialista / USER.
- Relatórios NR1, Gestão de Conflitos, Canal de Denúncias (continuam comingSoon).
- `@clamed/logger` / `light-node-metrics`.

### 4.3 Premissas e dependencias

- **A-01:** “Só o que tem hoje no outro painel” = extrair/exibir seções já renderizadas em `DashBoardAnswers` / `DashBoardRhSurveys`, sem novo dataset.
- **A-02:** Filtros do dashboard (período, unidade, etc.) permanecem disponíveis em cada visão, com o mesmo comportamento atual.
- **A-03:** Backend inalterado neste MVP (mesmas APIs de relatório/dashboard).
- **Gate Node:** **Não** — nenhum pacote Clamed neste MVP (mesmo produto Prepara.me).

## 5. Glossario

| Termo | Definicao |
|-------|-----------|
| Painel de riscos e impactos | Visão de KPIs (e-NPS, riscos trabalhista/marca, recolocação, etc.) |
| Pesquisa quantitativa | Avaliação pós-demissão (notas) + mapa/comparativo de sentimentos |
| Pesquisa qualitativa | Respostas textuais às perguntas da empresa já respondidas na pesquisa |

## 6. Regras de negocio (RN)

| ID | Regra | Obrigatoria? |
|----|-------|--------------|
| RN-01 | COMPANY_ADMIN acessa Painel e Indicadores (com submenu) pelo menu. | Sim |
| RN-02 | Indicadores > Pesquisa quantitativa mostra apenas blocos quantitativos (pós-demissão + sentimentos). | Sim |
| RN-03 | Indicadores > Pesquisa qualitativa mostra apenas respostas qualitativas existentes. | Sim |
| RN-04 | Painel de riscos e impactos não exibe os blocos de pesquisa quantitativa/qualitativa (ficam nos Indicadores). | Sim |
| RN-05 | Não há criação/edição de perguntas qualitativas nestas telas. | Sim |

## 7. Requisitos funcionais (RF)

| ID | Requisito | Prioridade | RNs |
|----|-----------|------------|-----|
| RF-01 | Menu: item “Painel de riscos e impactos” apontando para a visão de KPIs. | Must | RN-01, RN-04 |
| RF-02 | Menu: item “Indicadores de riscos” expansível com submenu (não comingSoon). | Must | RN-01 |
| RF-03 | Subitem “Pesquisa quantitativa” abre visão só com avaliação pós-demissão + mapa/comparativo de sentimentos. | Must | RN-02 |
| RF-04 | Subitem “Pesquisa qualitativa” abre visão só com respostas qualitativas. | Must | RN-03, RN-05 |
| RF-05 | Rotas/`userTypes` restritas a COMPANY_ADMIN (padrão atual). | Must | RN-01 |
| RF-06 | Docs produto RH atualizados com a nova navegação. | Should | — |

## 8. Requisitos nao funcionais (RNF)

| ID | Categoria | Requisito | Criterio |
|----|-----------|-----------|----------|
| RNF-01 | UX | Submenu claro no menu RH (desktop overlay + mobile drawer) | Usuário alcança os 2 subitens em ≤2 cliques a partir do menu |
| RNF-02 | Manutenibilidade | Reutilizar componentes atuais | Sem duplicar lógica de fetch; preferir props/flags de seção |
| RNF-03 | Performance | Não triplicar chamadas desnecessárias | Mesmo padrão de carga do dashboard atual por tela |

## 9. User stories e criterios de aceite

### US-01 — RH abre o painel de riscos

**Como** RH, **quero** ver só riscos e impactos no item Painel, **para** focar nos KPIs.

| ID | Criterio | RFs/RNs |
|----|----------|---------|
| CA-01 | **Dado** COMPANY_ADMIN **Quando** abre Painel **Entao** vê métricas de risco/impacto e **não** vê mapa de sentimentos nem bloco de perguntas da empresa | RF-01, RN-04 |

### US-02 — RH vê pesquisa quantitativa

**Como** RH, **quero** abrir Indicadores → Pesquisa quantitativa, **para** analisar notas e sentimentos.

| ID | Criterio | RFs/RNs |
|----|----------|---------|
| CA-02 | **Dado** COMPANY_ADMIN **Quando** abre Pesquisa quantitativa **Entao** vê avaliação pós-demissão e mapa/comparativo de sentimentos | RF-03, RN-02 |
| CA-03 | **Dado** a mesma tela **Entao** **não** vê o card de respostas qualitativas | RF-03, RN-02 |

### US-03 — RH vê pesquisa qualitativa

**Como** RH, **quero** abrir Indicadores → Pesquisa qualitativa, **para** ler respostas textuais já coletadas.

| ID | Criterio | RFs/RNs |
|----|----------|---------|
| CA-04 | **Dado** COMPANY_ADMIN **Quando** abre Pesquisa qualitativa **Entao** vê o bloco de respostas qualitativas (se houver dados) | RF-04, RN-03 |
| CA-05 | **Dado** a mesma tela **Entao** não há ação de cadastrar perguntas | RF-04, RN-05 |

## 10. Fluxos principais

### UC-01 — Navegação RH

1. Login COMPANY_ADMIN  
2. Menu → Painel **ou** Indicadores (expande) → Quantitativa / Qualitativa  
3. Sistema renderiza a seção correspondente com filtros padrão  

## 11. Excecoes e erros

| Situacao | Comportamento |
|----------|---------------|
| Sem respostas qualitativas | Tela qualitativa vazia / mensagem já usada hoje (sem inventar novo padrão) |
| Sem dados de sentimentos | Mantém comportamento atual dos componentes (ocultar ou empty state) |
| Item comingSoon antigo “Indicadores” | Removido — passa a ter submenu real |

## 12. Dados de negocio

N/A alteração de entidades — mesmos dados do dashboard RH.

## 13. Integracoes

N/A — mesmas APIs de dashboard/relatórios já consumidas por `DashBoardAnswers`.

## 14. Rastreabilidade

| US | RFs | RNs | CAs |
|----|-----|-----|-----|
| US-01 | RF-01 | RN-01, RN-04 | CA-01 |
| US-02 | RF-02, RF-03 | RN-02 | CA-02, CA-03 |
| US-03 | RF-02, RF-04 | RN-03, RN-05 | CA-04, CA-05 |

## 15. Cenarios VAL

| ID | Cenario | Esperado | Resultado | Evidencia |
|----|---------|----------|-----------|-----------|
| VAL-01 | Menu RH | Painel + Indicadores com 2 subitens | **PASS** | `menuConfig.js` COMPANY_ADMIN: Painel + Indicadores.children (quantitativa, qualitativa); `RhSideNavMenuPanel` com `q-expansion-item` |
| VAL-02 | Painel | Só KPIs de risco/impacto | **PASS** | `/platform` meta `rhSection: metrics` → `showRhMetrics`; `showRhSurveys` falso; título “Painel de riscos e impactos” |
| VAL-03 | Quantitativa | Pós-demissão + sentimentos; sem qualitativa | **PASS** | rota `…/quantitativa` → `showRhQuantitative`; `show-company-questions` falso |
| VAL-04 | Qualitativa | Só respostas qualitativas; sem cadastro | **PASS** | rota `…/qualitativa` → só `showRhQualitative`; menu RH sem `surveyQuestions`; empty state em `DashBoardRhSurveys` |
| VAL-05 | Deep link / refresh | Rota correta mantém a visão | **PASS** | meta nas rotas + `HomeCompany` lê `matched[].meta.rhSection` |

**Metodo:** verificacao estatica no codigo (2026-07-19). Smoke visual no browser recomendado se o front estiver no ar.

## 15.1 Suite automatizada (fase 6)

| Item | Resultado | Nota |
|------|-----------|------|
| `npm test` (platform) | **PASS** (placeholder) | Script: `No test specified` — repo sem Jest/Vitest/Cypress |
| Unit/e2e desta feat | **N/A** | Frontend Quasar sem harness de teste; mudar isso esta fora do escopo do MVP |
| Backend | **N/A** | Sem alteracao de API neste MVP |

## 16. Assumptions e perguntas abertas

| ID | Tipo | Texto | Impacto |
|----|------|-------|---------|
| A-01 | assumption | Separação é de UI/navegação, não de API | Alto |
| A-02 | assumption | Filtros permanecem em todas as visões | Medio |
| Q-01 | assumption | Gate Node: **Não** | Baixo |
| Q-02 | pergunta | Labels exatos no menu: “Pesquisa quantitativa” / “Pesquisa qualitativa” (confirmado pelo pedido)? | Baixo — default = esses textos |
| Q-03 | assumption (confirmada) | Painel = só KPIs (`DashBoardRhMetrics`); todo `DashBoardRhSurveys` vai para Indicadores (quantitativa / qualitativa). | Medio |

## 17. Historico de revisao

| Versao | Data | Autor | Mudanca |
|--------|------|-------|---------|
| 0.1 | 2026-07-19 | Agent Pro | Rascunho inicial |
| 0.2 | 2026-07-19 | Agent Pro | Aprovado: Painel=KPIs; Surveys nos Indicadores |
| 0.3 | 2026-07-19 | Agent Pro | VAL-01..05 PASS (estatico); header por rhSection |
| 0.4 | 2026-07-19 | Agent Pro | Suite automatizada: N/A harness; npm test placeholder PASS |
| 0.5 | 2026-07-19 | Agent Pro | Docs produto + README; Status verificado |
