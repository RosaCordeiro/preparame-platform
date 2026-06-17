# Inventário de skills

Status e prioridade das skills de desenvolvimento Prepara.me.

## Legenda

| Status | Significado |
|---|---|
| ✅ Implementada | `SKILL.md` em `.cursor/skills/` |
| 📋 Planejada | Documentada, não implementada |
| ⏸️ Opcional | Fase 3 — sob demanda |

---

## Fase 0 — Entrada (escolha do fluxo)

| Skill | Status | Descrição |
|---|---|---|
| `preparame-orquestrador` | ✅ | Roteamento para tarefas especificadas |
| `preparame-novas-demandas` | ✅ | Nova feature: brainstorm → code review |

## Fase 1 — Fundação

| Skill | Status | Descrição |
|---|---|---|
| `preparame-orquestrador` | ✅ | Roteamento automático (tarefas especificadas) |
| `preparame-novas-demandas` | ✅ | Nova feature — 8 fases com aprovações |
| `preparame-vue-quasar-base` | ✅ | Stack, estrutura, convenções |
| `preparame-router-auth` | ✅ | Rotas, guards, login, menu por perfil, axios auth |
| `preparame-crud-admin` | ✅ | Visão geral CRUD admin |
| `preparame-crud-usar-componentes` | ✅ | Usar CrudQuery, CrudRegister, templates e utils |
| `preparame-crud-criar-componentes` | ✅ | Criar *QueryCrud, *RegisterCrud, rotas, templates |

## Fase 2 — Domínios

| Skill | Status | Descrição |
|---|---|---|
| `preparame-site-publico` | ✅ | Site, catálogo, carrinho, landings, patrocínio |
| `preparame-ex-colaborador` | ✅ | HomeUser, agenda, simulador, resume, pedidos |
| `preparame-nps-relatorios` | ✅ | Survey NPS, dashboard RH, replacements |
| `preparame-pagamentos-pedidos` | ✅ | Orders, carrinho, Pagar.me helper |

## Qualidade e bugs

| Skill | Status | Descrição |
|---|---|---|
| `bug-founder` | ✅ | Varredura proativa de bugs no sistema (código existente) |
| `review-bugbot` | ✅ | Review de mudanças locais/branch (built-in Cursor) |

## Fase 3 — Opcionais

| Skill | Status | Descrição |
|---|---|---|
| `preparame-simulador-entrevistas` | 📋 | Grupos/vídeos simulador, acesso por plano |
| `preparame-estilos-scss` | 📋 | SCSS em src/css/, responsividade, temas |

---

## Rules (`.cursor/rules/`)

| Rule | Status | Escopo |
|---|---|---|
| `orquestrador-dev.mdc` | ✅ | Global — roteamento automático |
| `vue-quasar-base.mdc` | ✅ | `**/*.{vue,js}` — alwaysApply |
| `crud-patterns.mdc` | ✅ | `**/crud/**`, `**/*Crud.vue` |
| `router-auth.mdc` | ✅ | `src/router/**` |

---

## Manutenção

Ao criar nova skill:
1. Adicionar pasta em `.cursor/skills/nome-da-skill/SKILL.md`
2. Atualizar esta tabela
3. Vincular agente em `docs/desenvolvimento/agents/`
4. Atualizar `AGENTS.md` se skill for central
