# Agentes de desenvolvimento — Prepara.me Frontend

Este repositório é o **frontend** da Prepara.me (Vue 2 + Quasar 1).

## Agente principal (padrão)

**Você não precisa especificar agentes ou skills.** Descreva a tarefa normalmente — o **Orquestrador** classifica e delega automaticamente.

| | |
|---|---|
| Skill | `preparame-orquestrador` |
| Doc | [Orquestrador](docs/desenvolvimento/agents/orquestrador.md) |
| Rule | `.cursor/rules/orquestrador-dev.mdc` (sempre ativa) |

Exemplo: *"adiciona campo na listagem de produtos"* → roteia sozinho para CRUD.

### Nova demanda (feature do zero)

| | |
|---|---|
| Skill | `preparame-novas-demandas` |
| Doc | [Novas demandas](docs/desenvolvimento/agents/novas-demandas.md) |
| Pasta | [demandas/](docs/desenvolvimento/demandas/) |

Diga: *"Nova demanda: [descrição]"* — conduz brainstorm → plan → design → tech → **aprovação** → dev → **aprovação** → code review.

## Documentação

| Tipo | Onde |
|---|---|
| Produto / operação (não técnico) | [`docs/`](docs/README.md) |
| Desenvolvimento / agentes | [`docs/desenvolvimento/`](docs/desenvolvimento/README.md) |
| Skills Cursor | [`.cursor/skills/`](.cursor/skills/) |
| Rules Cursor | [`.cursor/rules/`](.cursor/rules/) |

## Stack

- Vue **2.6** + Quasar **1** (não migrar para Vue 3 sem decisão explícita)
- Vue Router (hash mode), Vuex mínimo
- Axios → API externa (`process.env.API` / `baseApiUrl`)
- ESLint, SCSS, Webpack via Quasar CLI v1

## Agentes especializados (referência — roteados automaticamente)

O orquestrador escolhe um destes conforme a tarefa. Só consulte manualmente se quiser entender o escopo.

| Tarefa | Agente | Skill |
|---|---|---|
| Não sei onde mexer / task ampla | [Orquestrador](docs/desenvolvimento/agents/orquestrador.md) | `preparame-orquestrador` |
| Site, landing, catálogo, carrinho | [Site público](docs/desenvolvimento/agents/site-publico.md) | `preparame-site-publico` |
| CRUD admin (empresas, usuários, produtos…) | [Plataforma CRUD](docs/desenvolvimento/agents/plataforma-crud.md) | `preparame-crud-admin` |
| Usar componentes CRUD existentes | — | `preparame-crud-usar-componentes` |
| Criar novo CRUD / entidade admin | — | `preparame-crud-criar-componentes` |
| Login, rotas, guards, menu por perfil | [Auth e rotas](docs/desenvolvimento/agents/autenticacao-rotas.md) | `preparame-router-auth` |
| Painel ex-colaborador, agenda, simulador | [Ex-colaborador](docs/desenvolvimento/agents/ex-colaborador.md) | `preparame-ex-colaborador` |
| NPS, dashboard RH, recolocação | [Pesquisas e relatórios](docs/desenvolvimento/agents/pesquisas-relatorios.md) | `preparame-nps-relatorios` |
| API, pagamento, analytics | [Integrações](docs/desenvolvimento/agents/integracoes.md) | `preparame-pagamentos-pedidos` |
| Caçar bugs, varredura de qualidade (código existente) | — | `bug-founder` |

## Regras gerais

1. Leia o doc de **produto** relacionado em `docs/` antes de alterar fluxos de negócio
2. Siga padrões existentes — especialmente CRUD genérico e rotas
3. Não altere escopo além do pedido
4. Backend **não está neste repo** — inferir contrato apenas pelas chamadas axios existentes
5. Rodar `yarn lint` após alterações relevantes

## Comandos

```bash
yarn dev      # desenvolvimento local
yarn build    # build produção
yarn lint     # ESLint
```
