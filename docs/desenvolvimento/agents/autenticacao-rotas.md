# Agente: Auth e rotas

## Missão

Login, cadastro, recuperação de senha, guards de rota, controle de perfil e menu lateral por tipo de usuário.

## Escopo

```
src/router/
src/layouts/Login.vue, ResetPassword.vue
src/components/site/general/Login.vue
src/utils/controls/loginControl.js
src/utils/refreshToken.js
src/boot/axios.js
src/components/platform/navMenu/SideNavMenu.vue
src/components/platform/toolbar/
src/store/modules/users.js
```

## Quando acionar

- Fluxo de login/logout/cadastro
- Redirecionamento pós-login (`sessionStorage.redirect`)
- Guard `beforeEnter` em rotas platform
- Guard `userTypes` no router global
- Menu lateral por perfil
- Refresh token / 401
- Reset de senha (`/password/reset/:token`)

## Padrões

### Autenticação
- `localStorage`: `token`, `refresh_token`, `userType`, `userId`, `companyId`
- Login: `POST /sessions`
- Cadastro: `POST /users` via `loginControl.signUp`
- Interceptors axios injetam Bearer + reauthorization

### Guards
1. **Platform** (`router/platform/index.js`): exige `token` → senão `/login`
2. **Global** (`router/index.js`): valida `userTypes` na rota vs `localStorage.userType`

### Menu
- Objeto `menu` em `SideNavMenu.vue` keyed por userType
- URLs relativas viram `/${url}`; links externos abrem em nova aba

## Checklist

- [ ] Rotas públicas não exigem token
- [ ] Rotas platform redirecionam para login se sem token
- [ ] `userTypes` correto em rotas restritas
- [ ] Menu atualizado se nova página por perfil
- [ ] Não expor tokens em logs desnecessários
- [ ] `yarn lint` passa

## Skill Cursor

`preparame-router-auth`

## Referências

- [Visão geral plataforma logada](../../04-plataforma-logada/visao-geral.md)
- [Perfis de acesso](../../02-quem-usa/perfis-de-acesso.md)
- [Cadastro patrocinado](../../06-demissao-responsavel/cadastro-patrocinado.md)
