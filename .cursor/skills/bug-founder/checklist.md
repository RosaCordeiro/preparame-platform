# Bug Founder — Checklist de padrões de risco

Referência para Fase 2. Adaptar ao escopo da varredura.

## Busca rápida (grep)

| Padrão | Regex / termo | Risco |
|---|---|---|
| Catch vazio | `catch\s*\(\s*\)\s*\{\s*\}` ou catch só com log | Erros silenciados |
| Console em prod | `console\.(log\|error\|warn)` em fluxos críticos | Debug esquecido; UX ruim |
| Comparação frouxa | `==` em userType, status, id | Coerção inesperada |
| JSON parse | `JSON\.parse\(localStorage` sem try/catch | Crash em sessão corrompida |
| Axios sem catch | `.then\(` sem `.catch` adjacente | Promise rejection não tratada |
| Hardcoded URL | `http://`, `https://` fora de env | Ambiente errado |
| TODO/FIXME/HACK | `TODO\|FIXME\|HACK\|XXX` | Dívida conhecida |
| any / eslint-disable | `eslint-disable` | Regra contornada |
| setInterval/setTimeout | sem `clear` em `beforeDestroy` | Memory leak |
| $emit sem handler | eventos custom sem listener no pai | Ação morta na UI |

## Auth e sessão

- [ ] Token lido de localStorage em toda request autenticada
- [ ] Logout limpa token, refresh_token, userType, redirect
- [ ] Rota admin sem `userTypes: ["ADMIN"]` (ou perfil correto)
- [ ] Guard platform redireciona para `/login` preservando path
- [ ] Refresh token: fila de requests durante refresh (evitar N refreshes)
- [ ] Cadastro/login: senha e email validados antes do POST
- [ ] Sessão expirada: mensagem ao usuário, não tela em branco

## Router e permissões

- [ ] `props.userTypes` alinhado com menu `SideNavMenu`
- [ ] Rota acessível por URL direta mesmo oculta no menu
- [ ] Hash mode: links externos com `#` correto
- [ ] `beforeEnter` não bloqueia rota pública por engano
- [ ] Redirect infinito login ↔ home

## CRUD admin

- [ ] Delete confirma com dialog antes de `removeCrud`
- [ ] Edição carrega registro completo (não só id da listagem)
- [ ] Campos obrigatórios: validação client antes de save
- [ ] Erro 400/422 da API exibido no form
- [ ] Listagem: loading state durante fetch
- [ ] Paginação: page/size enviados corretamente ao backend

## Site público e carrinho

- [ ] Carrinho persiste entre refresh (localStorage/session)
- [ ] Preço exibido = preço enviado no checkout
- [ ] Cupom/desconto recalcula total
- [ ] Produto indisponível não entra no carrinho
- [ ] Checkout sem login quando exige auth

## Pagamentos (Pagar.me)

- [ ] Cartão: dados não logados em console
- [ ] Falha de pagamento: estado do pedido = failed, UI informa
- [ ] Sucesso: redirect/confirmação idempotente (não duplica order)
- [ ] Webhook/backend assíncrono refletido na UI (polling ou refresh)

## Ex-colaborador

- [ ] Agenda: timezone em datas (utils de data)
- [ ] Simulador: acesso por plano verificado
- [ ] Upload currículo: tamanho/tipo validados
- [ ] Pedidos: status atualizado após pagamento

## NPS e relatórios

- [ ] Survey: envio único por período/usuário
- [ ] Gráficos: dados vazios não quebram Chart
- [ ] Export/print: dados sensíveis filtrados por perfil RH
- [ ] Filtros de período: default sensato (não carregar tudo)

## Axios e API

- [ ] `baseURL` de env, não hardcoded
- [ ] Interceptor 401 dispara refresh uma vez
- [ ] Upload multipart: Content-Type correto
- [ ] Cancelamento em navegação (AbortController ou flag destroyed)

## Vue 2 específico

- [ ] `key` em `v-for` estável (não index quando lista mutável)
- [ ] Prop object/array mutado in-place no filho
- [ ] Computed com efeito colateral
- [ ] `$set` usado ao adicionar chave reativa nova
- [ ] Quasar dialog/notify: await/callback de confirmação

## Backend (prepara-me-backend) — se no escopo

- [ ] Validação de input (class-validator ou equivalente)
- [ ] Auth middleware em rotas protegidas
- [ ] SQL/ORM: N+1, transações em operações compostas
- [ ] Erros não expõem stack trace em produção
- [ ] Rate limit / idempotência em webhooks de pagamento
