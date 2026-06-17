# Agente: Ex-colaborador

## Missão

Painel e ferramentas do perfil **USER**: agenda, pedidos, simulador de entrevistas, construtor de currículo, mentorias coletivas, cards de boas-vindas.

## Escopo

```
src/components/platform/home/HomeUser.vue
src/components/platform/home/externalUser/
src/components/platform/home/user/
src/components/platform/scheduleProducts/
src/components/platform/interviewSimulator/
src/components/platform/resumeCreator/
src/components/platform/orders/Orders.vue
src/components/platform/viewProductsUser/ (visão USER)
src/router/platform/platform.route.js (survey, simulator, resume)
```

## Quando acionar

- Painel inicial ex-colaborador
- Agendamento de mentorias / serviços do usuário
- Simulador de entrevistas (apresentação + uso)
- Construtor de currículo
- Meus pedidos
- Mentorias coletivas (calendário, troca)
- Variantes: patrocínio, plano aposentadoria (`isRetirementPlan`)

## Padrões

- Painel carregado via `HomeDynamicTemplate` → `HomeUser`
- Serviços do usuário: `GET users/products` com filtro `userId`
- Produtos agendados: `type === "SCHEDULED"` — exigem escolha de horário
- Simulador: verificar acesso ativo (`expiresDate`, `periodTest`)
- Plano aposentadoria oculta pesquisa e partes do welcome card
- Mobile: componentes `*Mobile.vue` quando `window.mobileAndTabletCheck()`

## Regras de negócio (produto)

- Pesquisa pós-demissão: uma resposta por usuário
- Revisão CV/LinkedIn: prazo 48h
- Ver [Ex-colaborador](../../02-quem-usa/ex-colaborador.md)

## Checklist

- [ ] Li doc produto relacionado em `docs/05` ou `docs/04`
- [ ] Respeitei flags `isRetirementPlan` e patrocínio
- [ ] Fluxo mobile considerado se UI compartilhada
- [ ] Não quebrei saldo/quantidade de produtos do usuário
- [ ] `yarn lint` passa

## Skill Cursor

`preparame-ex-colaborador`

## Referências

- [Painel do ex-colaborador](../../04-plataforma-logada/painel-do-ex-colaborador.md)
- [Simulador de entrevistas](../../05-produtos-e-servicos/simulador-de-entrevistas.md)
- [Jornada ex-colaborador patrocinado](../../07-jornadas/jornada-ex-colaborador-patrocinado.md)
