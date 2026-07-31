# Skills Cursor — Prepara.me

Skills implementadas em [`.cursor/skills/`](../../.cursor/skills/) do repositório.

## Como usar

Mencione a skill na conversa ou deixe o **orquestrador** (`preparame-orquestrador`) rotear automaticamente — **recomendado**.

Exemplo manual: *"Use a skill preparame-crud-usar-componentes para…"*

## Skills implementadas

| Skill | Fase | Agente |
|---|---|---|
| `preparame-orquestrador` | 0 | Tarefas especificadas — roteamento |
| `preparame-novas-demandas` | 0 | **Nova feature — brainstorm → code review** |
| `preparame-vue-quasar-base` | 1 | Orquestrador |
| `preparame-router-auth` | 1 | Auth e rotas |
| `preparame-crud-admin` | 1 | Plataforma CRUD (visão geral) |
| `preparame-crud-usar-componentes` | 1b | Usar CrudQuery/CrudRegister existentes |
| `preparame-crud-criar-componentes` | 1b | Criar nova entidade CRUD |
| `preparame-site-publico` | 2 | Site público |
| `preparame-ex-colaborador` | 2 | Ex-colaborador |
| `preparame-nps-relatorios` | 2 | Pesquisas e relatórios |
| `preparame-pagamentos-pedidos` | 2 | Integrações |

## Inventário completo

Ver [inventario-skills.md](inventario-skills.md) — inclui skills opcionais futuras (Fase 3).

## Rules complementares

Em [`.cursor/rules/`](../../.cursor/rules/):
- `vue-quasar-base.mdc` — sempre ativa
- `crud-patterns.mdc` — arquivos CRUD
- `router-auth.mdc` — rotas e auth
