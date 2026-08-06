# Design — Painel Executivo de Riscos e Impactos

| Campo | Valor |
|-------|-------|
| SPEC | `2026-08-05-painel-executivo-riscos-impactos.md` |
| Branch | `feat/painel-executivo-riscos-impactos` |
| Data | 2026-08-05 |
| Status | aprovado |

## Decisão

Troca **somente de copy** (sem layout novo):

| Superfície | Antes | Depois |
|------------|-------|--------|
| Menu RH (`menuConfig.js` → COMPANY_ADMIN) | Painel de riscos e impactos | Painel Executivo de Riscos e Impactos |
| Título página (`DashBoardAnswers.rhPageTitle` / metrics) | Painel de riscos e impactos | Painel Executivo de Riscos e Impactos |

## Não muda

- Rota `/platform`, ícone `mdi-view-dashboard-outline`, subtítulo, cards, tipografia.
- Demais itens do menu (Indicadores, OTW, etc.).

## Impacto docs

Atualizar docs vivas (mapa, painel RH, jornada, admin empresa, README, CHANGELOG). Manter SPECs históricas intactas.
