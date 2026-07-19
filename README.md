# Prepara.me Platform (frontend)

Frontend Quasar/Vue 2 da plataforma **Prepara.me | Demissão Responsável** (`prepara-me-platform`).

Documentação de produto: [`docs/`](docs/README.md).  
Desenvolvimento / agentes: [`docs/desenvolvimento/`](docs/desenvolvimento/README.md) e [`AGENTS.md`](AGENTS.md).

## Subir em desenvolvimento

```bash
npm install
# ou: yarn

npm run dev
# equivalente: NODE_OPTIONS='--openssl-legacy-provider' npx quasar dev
```

A API e o banco ficam no backend (Compose em `preparame-backend`, tipicamente API `:3334`). Ajuste o `.env` do frontend para apontar ao host da API.

### Lint e build

```bash
npm run lint
npm run build
```

### Testes

```bash
npm test
```

Hoje o script é placeholder (`No test specified`). Validação de features segue os cenários `VAL-*` nas specs em `docs/desenvolvimento/especificacoes/`.

## UI — menu do RH (COMPANY_ADMIN)

| Menu | Rota | Conteúdo |
|------|------|----------|
| Painel de riscos e impactos | `/platform` | KPIs (e-NPS, riscos, recolocação, etc.) |
| Indicadores → Pesquisa quantitativa | `/rh/indicadores/quantitativa` | Avaliação pós-demissão + mapa de sentimentos |
| Indicadores → Pesquisa qualitativa | `/rh/indicadores/qualitativa` | Respostas textuais (consulta; cadastro só no Admin) |

Cadastro de perguntas qualitativas: perfil **ADMIN** → Cadastros → Perguntas Qualitativas (`/surveyQuestions`).

Detalhe de produto: [Painel do RH](docs/04-plataforma-logada/painel-do-rh-empresa.md).

## Specs desta entrega

| Doc | Path |
|-----|------|
| SPEC | [`docs/desenvolvimento/especificacoes/2026-07-19-rh-menu-indicadores-pesquisas.md`](docs/desenvolvimento/especificacoes/2026-07-19-rh-menu-indicadores-pesquisas.md) |
| Design | [`docs/desenvolvimento/especificacoes/2026-07-19-rh-menu-indicadores-pesquisas-design.md`](docs/desenvolvimento/especificacoes/2026-07-19-rh-menu-indicadores-pesquisas-design.md) |

## Configuração Quasar

Ver [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
