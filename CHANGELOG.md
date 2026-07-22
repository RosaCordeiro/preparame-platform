# Changelog

Todas as mudanças notáveis deste frontend (`prepara-me-platform`) são registradas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Versão do `package.json` hoje: `0.0.1` (ainda sem tags semver de release; entradas sob **Unreleased** até o próximo corte).

## [Unreleased]

### Added

- Branch `feat/rh-open-to-work-melhorias`: tela **Contrate Open to Work** só com listagem + filtros cargo/área/cidade/estado; aviso ao clicar LinkedIn ausente.
- Spec/design: `docs/desenvolvimento/especificacoes/2026-07-21-rh-open-to-work-melhorias.md` (+ `-design.md`).
- Branch `feat/rh-anonimato-limite-amostra`: consumo de `insufficientSample` da API de relatório NPS (anonimato RH).
- Branch `feat/rh-cards-pesquisa-quantitativa`: KPIs de risco/impacto na **Pesquisa quantitativa** (Indicadores de riscos).
  - Cards: e-NPS, Risco trabalhista, Risco de marca, Realocados, Acolhidos, Pessoas realocadas, Cálculos da rescisão, Pendências trabalhistas.
  - Placeholders “em breve” da quantitativa no **mesmo** grid dos KPIs.
- Spec e design: `docs/desenvolvimento/especificacoes/2026-07-21-rh-cards-pesquisa-quantitativa.md` (+ `-design.md`).
- Este arquivo `CHANGELOG.md`.

### Changed

- Open to Work: remove dashboard/filtros de relatório de recolocação da mesma rota; remove coluna Empresa; LinkedIn opcional na lista.
- Flag de amostra insuficiente: `lessThanFive` → **`insufficientSample`**; texto de omissão unificado em **`Sem informações`** (sem `N/A` nesses fluxos).
- **Painel de riscos e impactos** (`/platform`): deixa de exibir os 8 KPIs acima; mantém apenas os demais cards (placeholders do Painel).
- Rótulos: **Marca** → **Risco de marca**; **Pessoas recolocadas** → **Pessoas realocadas**.
- Docs de produto RH e `README` alinhados à nova localização dos KPIs / anonimato / OTW.

### Removed

- Card **Taxa de recolocação** na quantitativa (duplicata de **Realocados**).
- Componente `DashBoardRhQuantitativeCards.vue` (conteúdo absorvido por `DashBoardRhMetrics`).
- Métricas/filtros de datas/empresa na tela `/replacementsReport` (fluxo RH OTW).

### Docs / validação

- VAL-01…07 (Open to Work) PASS (código); VAL cards/anonimato anteriores PASS.
- Suite automatizada platform: N/A (`npm test` placeholder); regressão OTW no backend (`ListCompanyEmployeeUseCase.spec`).

---

## Notas

- Entregas anteriores recentes (menu RH Painel/Indicadores, LinkedIn, pessoas do programa, layout RH) estão no histórico Git; podem ser condensadas aqui em releases futuras se houver tag/versão.
