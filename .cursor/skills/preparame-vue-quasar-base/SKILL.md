---
name: preparame-vue-quasar-base
description: >-
  Convenções Vue 2 e Quasar 1 do frontend Prepara.me — estrutura src/,
  layouts site vs platform, global.js, lint. Use ao iniciar tarefas no
  repositório, refactors amplos, ou quando precisar orientar onde implementar.
---

# Prepara.me — Base Vue/Quasar

## Quick start

1. Identifique se a mudança é **site** (`components/site/`, `router/site/`) ou **platform** (`components/platform/`, `router/platform/`)
2. Leia doc de produto em `docs/` se envolve regra de negócio
3. Siga padrões existentes — não introduza Vue 3, TypeScript ou novas libs sem pedido
4. Rode `yarn lint` ao final

## Estrutura src/

| Pasta | Uso |
|---|---|
| `components/site/` | Site público, e-commerce |
| `components/platform/` | Área logada (todos perfis) |
| `components/general/` | CRUD, dialogs, widgets |
| `layouts/` | Shells de página |
| `router/site/` | Rotas públicas |
| `router/platform/` | Rotas autenticadas |
| `boot/` | axios, analytics, charts |
| `utils/` | helpers transversais |
| `css/` | SCSS global |

## Globals importantes

```javascript
import { baseApiUrl, showError, showSuccess } from "src/global.js";
```

- `baseApiUrl` = `process.env.API`
- Backend **externo** — inferir endpoints de arquivos similares

## Comandos

```bash
yarn dev
yarn build
yarn lint
```

## Agentes especializados

Ver `docs/desenvolvimento/agents/` e `AGENTS.md` na raiz.

## Recursos

- [Arquitetura frontend](../../docs/desenvolvimento/arquitetura-frontend.md)
- [Mapa produto](../../docs/01-visao-geral/mapa-da-plataforma.md)
