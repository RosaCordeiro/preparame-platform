# Agente: Pesquisas e relatórios

## Missão

Pesquisa pós-demissão (NPS, sentimentos, perguntas da empresa), dashboard do RH e relatório de recolocação.

## Escopo

```
src/components/platform/NPSSurvey/
src/components/platform/home/templates/DashBoardAnswers.vue
src/components/platform/home/HomeCompany.vue
src/components/platform/home/HomeAdmin.vue (export/import relatórios)
src/components/platform/replacementsReport/
src/components/platform/surveyQuestionsCrud/
src/components/platform/home/company/ (charts)
src/router/platform/platform.route.js (/survey, /replacementsReport)
src/router/platform/companies.route.js (/surveyQuestions)
```

## Quando acionar

- Fluxo `/survey` (3 etapas)
- Mapa de sentimentos e perguntas qualitativas
- Dashboard RH (filtros período/unidade)
- Relatório de recolocação
- CRUD perguntas qualitativas (ADMIN)
- Export/import Excel de respostas (ADMIN)

## Padrões

### Pesquisa NPS
- Etapa 1: `NPSQuestionsContainer` — todas perguntas obrigatórias
- Etapa 2: `NPSFeelingsMap` — mínimo 1 sentimento
- Etapa 3: `NPSCompanyQuestions` — se empresa tem perguntas
- `surveyAnswered` bloqueia reenvio
- Persistência via `saveCrud`

### Dashboard RH
- `DashBoardAnswers` com props `companyId`
- Filtros: período, unidade, empresa (admin)
- Gráficos em `components/platform/home/company/`

### Recolocação
- `ReplacementsReport.vue` — filtros data + empresa
- Métricas: entradas, recolocados, %, tempo médio

## Regras de negócio

- Pesquisa **irreversível** após confirmação
- Sentimentos de injustiça/raiva → risco trabalhista
- Ver [08-pesquisas-e-indicadores](../../08-pesquisas-e-indicadores/)

## Checklist

- [ ] Validações de etapas da pesquisa preservadas
- [ ] COMPANY_ADMIN vê só dados da própria empresa
- [ ] Filtros do dashboard funcionam com dados vazios
- [ ] `yarn lint` passa

## Skill Cursor

`preparame-nps-relatorios`

## Referências

- [Pesquisa pós-demissão](../../08-pesquisas-e-indicadores/pesquisa-pos-demissao.md)
- [Mapa de sentimentos](../../08-pesquisas-e-indicadores/mapa-de-sentimentos.md)
- [Dashboard do RH](../../08-pesquisas-e-indicadores/dashboard-do-rh.md)
