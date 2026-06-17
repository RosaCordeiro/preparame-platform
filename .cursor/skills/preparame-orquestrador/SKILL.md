---
name: preparame-orquestrador
description: >-
  Agente principal do Prepara.me frontend. Analisa a tarefa, escolhe o agente
  e skills especializados corretos e executa. Use em QUALQUER tarefa de
  desenvolvimento neste repositório quando o usuário não especificar agente.
  Para NOVA FEATURE ou NOVA DEMANDA do zero, use preparame-novas-demandas
  em vez deste orquestrador até passar Aprovação 1.
---

# Orquestrador — Prepara.me Frontend

Você é o **agente principal** para tarefas **já especificadas**. O usuário **não precisa** nomear agentes ou skills — você classifica a tarefa e aplica as skills corretas automaticamente.

## Nova demanda vs tarefa direta

| Tipo | Skill |
|---|---|
| Nova feature, ideia, "vamos planejar", brainstorm | **`preparame-novas-demandas`** — NÃO codar |
| Bug, ajuste, tarefa já aprovada/especificada | **Este orquestrador** |

## Fluxo obrigatório

1. **Classificar** a tarefa (tabela abaixo)
2. **Ler** doc de produto em `docs/` se envolver regra de negócio
3. **Carregar** skill(s) especializada(s) da seção correspondente
4. **Implementar** seguindo padrões do projeto
5. **Validar** com `yarn lint` se alterou código

## Matriz de roteamento

| Se a tarefa envolve… | Agente | Skill(s) a aplicar |
|---|---|---|
| Site, home, landing, catálogo, carrinho, Kit Pro, patrocínio, FAQ | Site público | `preparame-site-publico` |
| Login, logout, cadastro, senha, guards, rotas, menu lateral | Auth e rotas | `preparame-router-auth` |
| **Estender** CRUD existente (filtro, coluna, campo) | Plataforma CRUD | `preparame-crud-usar-componentes` |
| **Criar** nova entidade/tela admin CRUD | Plataforma CRUD | `preparame-crud-criar-componentes` |
| CRUD admin genérico / dúvida CRUD | Plataforma CRUD | `preparame-crud-admin` → especializar |
| Painel USER, agenda, simulador, currículo, pedidos, mentorias | Ex-colaborador | `preparame-ex-colaborador` |
| Pesquisa NPS, sentimentos, dashboard RH, recolocação | Pesquisas e relatórios | `preparame-nps-relatorios` |
| Pagamento, orders, carrinho checkout, Pagar.me | Integrações | `preparame-pagamentos-pedidos` |
| Axios, API, analytics, upload, refresh token | Integrações | `preparame-router-auth` + utils |
| Task ampla, refactor cross-cutting, "onde mexer?" | Orquestrador | `preparame-vue-quasar-base` + skill do domínio |
| Doc de produto / entender plataforma | — | `docs/` (não `docs/desenvolvimento/`) |
| **Nova feature / nova demanda / brainstorm / RFC** | **Novas demandas** | **`preparame-novas-demandas`** |

### Tarefas compostas

Aplique **múltiplas skills** em ordem:
- Nova feature site + API → `preparame-site-publico` + `preparame-pagamentos-pedidos`
- Nova rota admin CRUD → `preparame-crud-criar-componentes` + `preparame-router-auth`
- Feature USER com nova rota → `preparame-ex-colaborador` + `preparame-router-auth`

## Mapa rápido de pastas → agente

| Pasta / arquivo | Agente |
|---|---|
| `src/components/site/` | Site público |
| `src/layouts/novo-site/`, `HomePageCompany.vue` | Site público |
| `src/router/site/` | Site público |
| `src/components/general/crud/` | Plataforma CRUD |
| `src/components/platform/*Crud/` | Plataforma CRUD |
| `src/router/platform/` | Auth e rotas (+ CRUD se nova rota) |
| `src/components/platform/home/HomeUser*` | Ex-colaborador |
| `src/components/platform/interviewSimulator/` | Ex-colaborador |
| `src/components/platform/NPSSurvey/` | Pesquisas e relatórios |
| `src/components/platform/replacementsReport/` | Pesquisas e relatórios |
| `src/boot/axios.js`, `src/tools/` | Integrações |
| `src/layouts/Login.vue`, `SideNavMenu.vue` | Auth e rotas |

## Regras globais (sempre)

- Vue **2.6** + Quasar **1** — sem Vue 3/TypeScript
- Backend **externo** — inferir API de arquivos similares
- Minimizar escopo — não refatorar código não relacionado
- CRUD: **nunca** reimplementar listagem/form — usar genéricos
- Produto: consultar `docs/` antes de mudar fluxos de negócio

## Resposta ao usuário

Ao iniciar tarefa, declare brevemente (1 linha):
> *Roteando para: [Agente] — skills: [nomes]*

Depois execute sem pedir confirmação, salvo ambiguidade real.

## Documentação

| Tipo | Caminho |
|---|---|
| Produto | `docs/` |
| Agentes (personas) | `docs/desenvolvimento/agents/` |
| Arquitetura | `docs/desenvolvimento/arquitetura-frontend.md` |
| Entrada repo | `AGENTS.md` |

## Skills disponíveis (índice)

| Skill | Foco |
|---|---|
| `preparame-vue-quasar-base` | Stack, estrutura, convenções |
| `preparame-orquestrador` | Este arquivo — roteamento (tarefas especificadas) |
| `preparame-novas-demandas` | Nova feature — brainstorm até code review |
| `preparame-site-publico` | Site e e-commerce |
| `preparame-router-auth` | Rotas e autenticação |
| `preparame-crud-admin` | CRUD visão geral |
| `preparame-crud-usar-componentes` | Usar CrudQuery/Register |
| `preparame-crud-criar-componentes` | Criar nova entidade CRUD |
| `preparame-ex-colaborador` | Perfil USER |
| `preparame-nps-relatorios` | NPS e dashboards |
| `preparame-pagamentos-pedidos` | Pagamentos |
