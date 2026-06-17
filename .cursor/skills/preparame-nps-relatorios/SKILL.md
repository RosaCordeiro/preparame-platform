---
name: preparame-nps-relatorios
description: >-
  Pesquisa NPS pós-demissão, mapa de sentimentos, dashboard DashBoardAnswers
  e relatório ReplacementsReport no Prepara.me. Use ao alterar survey, NPS,
  indicadores RH ou métricas de recolocação.
---

# Prepara.me — NPS e Relatórios

## Pesquisa `/survey`

Componente orquestrador: `NPSSurvey.vue`

| Etapa | Componente | Validação |
|---|---|---|
| 1 | NPSQuestionsContainer | Todas perguntas respondidas |
| 2 | NPSFeelingsMap | Mínimo 1 sentimento |
| 3 | NPSCompanyQuestions | Se empresa tem perguntas |

- `surveyAnswered` bloqueia reenvio
- Confirmação irreversível via dialog
- Oculto para `isRetirementPlan`

## Sentimentos (Etapa 2)

Lista em `NPSSurvey.vue` data `feelings`. Alguns têm `laborRiskCheck: true` (injustiça, raiva).

## Dashboard RH

- `HomeCompany.vue` → `DashBoardAnswers.vue`
- Filtros: período, unidade, empresa
- Charts em `home/company/RowChart*.vue`

## Perguntas qualitativas

CRUD em `surveyQuestionsCrud/` — perfil COMPANY_ADMIN
Rotas: `/surveyQuestions`

## Relatório recolocação

- `ReplacementsReport.vue` — `/replacementsReport`
- Filtros: startDate, endDate, companyId
- Métricas: total_entrada, total_recolocados, percentual, tempo médio

## Admin — export/import

`HomeAdmin.vue`: Excel respostas, import template, relatório únicos, link recolocados.

## Doc produto

- `docs/08-pesquisas-e-indicadores/`
- `docs/07-jornadas/jornada-pos-demissao-pesquisa.md`
