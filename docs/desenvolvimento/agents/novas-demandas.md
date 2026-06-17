# Agente: Novas Demandas

## Missão

Conduzir **novas features e demandas** do zero até o code review — com brainstorm, plano, design, spec técnica, **duas aprovações** e desenvolvimento delegado ao orquestrador.

## Quando acionar

- *"Nova demanda: …"*
- *"Vamos planejar uma feature …"*
- *"Preciso de brainstorm antes de codar"*
- Ideias, RFCs, specs, funcionalidades novas

## Quando NÃO acionar

- Bug fix pontual → Orquestrador direto
- Ajuste em CRUD existente já especificado → Orquestrador → CRUD
- Tarefa com spec pronta e aprovação implícita → Orquestrador

## Fluxo — 8 fases

| # | Fase | Entregável | Gate |
|---|---|---|---|
| 1 | Brainstorm | Problema, alternativas, personas | — |
| 2 | Plan | Escopo, user stories, critérios de aceite | — |
| 3 | Design | Fluxo UX, telas, estados | — |
| 4 | Tech | Arquivos, rotas, API, agente dev | — |
| 5 | **Aprovação 1** | Resumo consolidado | **Obrigatório** |
| 6 | Desenvolvimento | Código (via orquestrador) | — |
| 7 | **Aprovação 2** | Demo vs critérios de aceite | **Obrigatório** |
| 8 | Code Review | Checklist + bugbot | — |

**Regra de ouro:** nenhum código antes da Aprovação 1.

## Artefato

Cada demanda gera/atualiza:

```
docs/desenvolvimento/demandas/YYYY-MM-DD-slug.md
```

Template: [`demandas/template.md`](../demandas/template.md)

## Skill Cursor

**`preparame-novas-demandas`**

## Integração

| Fase | Delegação |
|---|---|
| 1–4 | Docs produto `docs/` |
| 6 | `preparame-orquestrador` → skills especializadas |
| 8 | Bugbot (code review automatizado) |

## Comandos do usuário

| Você diz | O que acontece |
|---|---|
| *"Nova demanda: X"* | Inicia Fase 1, cria arquivo |
| *"Aprovado, pode desenvolver"* | Fase 6 após gate 1 |
| *"Continua demanda slug"* | Retoma fase do arquivo |
| *"Code review"* | Fase 8 |

## Referências

- [Skill novas demandas](../../../.cursor/skills/preparame-novas-demandas/SKILL.md)
- [Orquestrador](orquestrador.md)
- [Pasta demandas](../demandas/README.md)
