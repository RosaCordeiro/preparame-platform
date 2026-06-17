# Arquitetura frontend

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Vue 2.6 |
| UI | Quasar 1 |
| Roteamento | Vue Router (mode via `process.env.VUE_ROUTER_MODE`, tipicamente hash) |
| Estado | Vuex (mínimo — auth em `store/modules/users.js`) |
| HTTP | Axios (`src/boot/axios.js`) |
| Gráficos | Chart.js, vue-apexcharts, vue-google-charts |
| Build | Quasar CLI v1 / Webpack |
| Lint | ESLint + eslint-plugin-vue |

**Não usar:** TypeScript, Vue 3, Composition API como padrão (instalada mas uso limitado).

## Estrutura `src/`

```
src/
├── assets/           # Imagens, fontes, logos
├── boot/             # Inicialização (axios, analytics, charts)
├── components/
│   ├── general/      # Compartilhados (CRUD, dialogs, charts)
│   ├── platform/     # Área logada (admin, USER, SPECIALIST, RH)
│   └── site/         # Site público e e-commerce
├── config/           # Config de notificações
├── css/              # SCSS global e por página
├── layouts/          # Shells (Site, Platform, Login, novo-site)
├── pages/            # Páginas avulsas (ex.: 404)
├── router/
│   ├── site/         # Rotas públicas
│   └── platform/     # Rotas autenticadas
├── store/            # Vuex
├── tools/            # Helpers (ex.: pagamento)
└── utils/            # Validators, datas, login, refresh token
```

## Duas aplicações lógicas

| Área | Router | Layout típico |
|---|---|---|
| Site público | `src/router/site/` | `novo-site/NewLayout`, `Site` |
| Plataforma logada | `src/router/platform/` | `Platform`, `Login` |

Rotas consolidadas em `src/router/routes.js`.

## Padrões principais

### CRUD administrativo

Telas admin usam componentes genéricos em `components/general/crud/`:
- `CrudQuery` — listagem + filtros
- `CrudRegister` — formulário create/edit
- Utils: `saveCrud`, `filterCrud`, `openEditCrud`, `removeCrud`

Cada domínio expõe `*QueryCrud.vue` e `*RegisterCrud.vue` com config declarativa (columns, filters, registerColumns).

### Autenticação

- Token JWT + refresh em `localStorage`
- Interceptors em `boot/axios.js`
- Guard de login em `router/platform/index.js` (`beforeEnter`)
- Guard de perfil em `router/index.js` (`userTypes` nas rotas)
- Menu lateral: `components/platform/navMenu/SideNavMenu.vue`

### API

- Base URL: `baseApiUrl` de `src/global.js` (`process.env.API`)
- Backend **externo** — não há código de API neste repo
- Erros: `showError()` de `global.js` (Quasar Notify)

### Painéis por perfil

`HomeDynamicTemplate.vue` carrega dinamicamente:
- `HomeUser`, `HomeSpecialist`, `HomeAdmin`, `HomeCompany`

## Perfis de usuário

| Perfil | localStorage `userType` |
|---|---|
| Ex-colaborador | `USER` |
| Especialista | `SPECIALIST` |
| RH empresa | `COMPANY_ADMIN` |
| Admin plataforma | `ADMIN` |

## Variáveis de ambiente

Definidas via `.env` + `quasar.conf.js`:
- `API` — URL da API
- `VUE_ROUTER_MODE`, `VUE_ROUTER_BASE`

## Comandos

```bash
yarn dev      # NODE_OPTIONS=--openssl-legacy-provider quasar dev
yarn build
yarn lint
```

## Relacionado

- [Mapa da plataforma (produto)](../01-visao-geral/mapa-da-plataforma.md)
- [Agentes](agents/README.md)
- [AGENTS.md](../../AGENTS.md)
