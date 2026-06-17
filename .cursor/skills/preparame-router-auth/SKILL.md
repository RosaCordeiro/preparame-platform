---
name: preparame-router-auth
description: >-
  Rotas, login, guards, refresh token, menu SideNavMenu e controle de perfil
  userType no Prepara.me. Use ao alterar router/, Login, auth, interceptors
  axios ou menu lateral por perfil.
---

# Prepara.me — Router e Auth

## Fluxo de autenticação

1. Login → `POST /sessions` → salva `token`, `refresh_token`, `userType` em localStorage
2. Cadastro → `loginControl.signUp()` → `POST /users`
3. Request axios → interceptor injeta Bearer + reauthorization
4. 401 + refresh_token → `refreshToken()` em `utils/refreshToken.js`

## Guards

### Platform (`router/platform/index.js`)
Todas rotas platform recebem `beforeEnter`: sem token → `/login` + `sessionStorage.setItem("redirect", to.path)`

### Perfil (`router/index.js`)
Se rota tem `props.userTypes`, valida contra `localStorage.userType`

## Adicionar rota platform

1. Criar/editar `*.route.js` em `router/platform/`
2. Importar array em `router/platform/index.js`
3. Estrutura padrão:

```javascript
{
  path: "/minha-area",
  components: { site: Platform },
  children: [{ path: "/", components: { content: MeuVue } }],
  props: { userTypes: ["ADMIN"] }
}
```

4. Adicionar item em `SideNavMenu.vue` se necessário

## Menu por perfil

`SideNavMenu.vue` — objeto `menu` com keys: `ADMIN`, `USER`, `SPECIALIST`, `COMPANY_ADMIN`

## Painel dinâmico

`HomeDynamicTemplate.vue` importa `HomeUser`, `HomeSpecialist`, `HomeAdmin`, `HomeCompany` conforme userType.

## Referências

- [Agente auth](../../docs/desenvolvimento/agents/autenticacao-rotas.md)
- [Perfis produto](../../docs/02-quem-usa/perfis-de-acesso.md)
