# Prepara.me Platform (frontend)

Frontend Quasar/Vue 2 da plataforma **Prepara.me | Demissão Responsável** (`prepara-me-platform`).

Documentação de produto: [`docs/`](docs/README.md).  
Desenvolvimento / agentes: [`docs/desenvolvimento/`](docs/desenvolvimento/README.md) e [`AGENTS.md`](AGENTS.md).  
Histórico de mudanças: [`CHANGELOG.md`](CHANGELOG.md).

## Subir em desenvolvimento

```bash
npm install
# ou: yarn

npm run dev
# equivalente: NODE_OPTIONS='--openssl-legacy-provider' npx quasar dev
```

A API e o banco ficam no backend (Compose em `preparame-backend`, tipicamente API `:3334`). Ajuste o `.env` do frontend para apontar ao host da API.

Anonimato dos filtros RH é enforcement na API (`insufficientSample` / `Sem informações`). Ver backend `SURVEY_ANONYMITY_MIN_RESPONDENTS`.

### Lint e build

```bash
npm run lint
npm run build
```

### Testes

```bash
npm test
```

Hoje o script é placeholder (`No test specified`). Validação de features segue os cenários `VAL-*` nas specs. Testes do limiar de anonimato ficam no backend (`NPSSurveyAnswersUseCase.spec.ts`).

## UI — menu do RH (COMPANY_ADMIN)

| Menu | Rota | Conteúdo |
|------|------|----------|
| Painel de riscos e impactos | `/platform` | Demais cards de impacto (placeholders) |
| Indicadores → Pesquisa quantitativa | `/rh/indicadores/quantitativa` | KPIs (e-NPS, riscos, realocação, etc.) + pós-demissão / sentimentos |
| Indicadores → Pesquisa qualitativa | `/rh/indicadores/qualitativa` | Respostas textuais (consulta; cadastro só no Admin) |

Cadastro de perguntas qualitativas: perfil **ADMIN** → Cadastros → Perguntas Qualitativas (`/surveyQuestions`).

### Admin — Segmento / Subsegmento

| Menu | Rota |
|------|------|
| Cadastros → Segmentos | `/segments` |
| Cadastros → Subsegmentos | `/subsegments` |

Na **Empresa** (`/companies/:id`): Segmento e Subsegmento são **opcionais**.

### RH — Open to Work / Recolocações

Rota típica: `/replacementsReport`. Filtros de **Segmento** e **Subsegmento** (dropdown) no mesmo card de filtros; a lista mostra essas colunas a partir da empresa do candidato e **não** exibe a empresa.

Detalhe de produto: [Painel do RH](docs/04-plataforma-logada/painel-do-rh-empresa.md).

## Specs desta entrega

| Doc | Path |
|-----|------|
| CHANGELOG | [`CHANGELOG.md`](CHANGELOG.md) |
| Segmento / Subsegmento | [`docs/desenvolvimento/especificacoes/2026-07-22-rh-segmento-subsegmento.md`](docs/desenvolvimento/especificacoes/2026-07-22-rh-segmento-subsegmento.md) |
| Anonimato (backend) | [`../prepara-me-backend/docs/desenvolvimento/especificacoes/2026-07-21-rh-anonimato-limite-amostra.md`](../prepara-me-backend/docs/desenvolvimento/especificacoes/2026-07-21-rh-anonimato-limite-amostra.md) |
| SPEC cards quantitativa | [`docs/desenvolvimento/especificacoes/2026-07-21-rh-cards-pesquisa-quantitativa.md`](docs/desenvolvimento/especificacoes/2026-07-21-rh-cards-pesquisa-quantitativa.md) |
| Design cards quantitativa | [`docs/desenvolvimento/especificacoes/2026-07-21-rh-cards-pesquisa-quantitativa-design.md`](docs/desenvolvimento/especificacoes/2026-07-21-rh-cards-pesquisa-quantitativa-design.md) |
| SPEC menu RH | [`docs/desenvolvimento/especificacoes/2026-07-19-rh-menu-indicadores-pesquisas.md`](docs/desenvolvimento/especificacoes/2026-07-19-rh-menu-indicadores-pesquisas.md) |

## Configuração Quasar

Ver [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
