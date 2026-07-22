---
name: teste-automatizado
description: >-
  Executa a suite completa de testes automatizados (unitario, integracao, e2e
  conforme o projeto) apos os testes de regra de negocio. Use na fase 6 do Dev
  All-in-One ou quando o usuario pedir pytest, jest, CI, cobertura, regressao.
---

# Teste automatizado

Fase **depois** de `teste-regra-negocio` e **antes** de documentacao geral.
Responda em portugues.

## Regra obrigatoria — suite geral

**Sempre** rodar a **suite completa** do projeto (comando padrao, ex.: `npm test`, `pytest`, `go test ./...`, script CI local).

- **Nao** substituir a suite geral por um `--testPathPattern` / filtro estreito como evidencia final da fase.
- Filtro focado so e permitido **durante** o desenvolvimento/debug de uma falha; antes de marcar a fase como ok, **re-rodar a suite geral**.
- Se o repo tiver varios pacotes/apps, rodar a suite completa de **cada** pacote afetado pela entrega.
- Se `npm test` (ou equivalente) for placeholder (`No test specified`), declarar **N/A** com evidencia do script — e ainda assim rodar a suite geral nos outros repos da entrega.

## Processo

1. Identificar o que o repo ja tem (framework, pastas, CI, comando de suite completa).
2. Garantir cobertura da mudanca (adicionar/ajustar testes pontuais se a mudanca exige) **e** regressao.
3. **Rodar a suite geral** do(s) projeto(s); corrigir falhas introduzidas por esta branch.
4. Relatar: comando(s) da suite geral, passou/falhou (suites/testes), gaps conscientes (N/A justificado).
5. **`AskQuestion`**: `Suite automatizada ok?`
   - `Sim, seguir para documentacao` | `Corrigir falhas` | `Outro (eu digito)`

## Limites

- Nao substituir VAL-xx / V-xx de negocio se ainda nao rodaram — volte a `teste-regra-negocio`.
- Nao inventar infra de teste gigante se o projeto e minimo; declare o recorte — mas **nao** use isso para pular a suite geral existente.
