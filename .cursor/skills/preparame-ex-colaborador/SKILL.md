---
name: preparame-ex-colaborador
description: >-
  Painel e ferramentas do ex-colaborador USER — HomeUser, agenda Schedule,
  simulador interviewSimulator, resumeCreator, Orders e mentorias coletivas.
  Use ao alterar fluxos do perfil USER na plataforma logada.
---

# Prepara.me — Ex-colaborador (USER)

## Entry point

- Painel: `/platform` → `HomeDynamicTemplate` → `HomeUser.vue`
- Menu: Simulador, Meus Pedidos (`SideNavMenu.vue`)

## Componentes-chave

| Área | Arquivos |
|---|---|
| Painel | `home/HomeUser.vue`, `externalUser/*`, `user/UserCard.vue` |
| Agenda | `scheduleProducts/`, `home/templates/Schedule.vue` |
| Simulador | `interviewSimulator/` |
| Currículo | `resumeCreator/` |
| Pedidos | `orders/Orders.vue` |
| Mentorias coletivas | `externalUser/ExternalUserMentoringSchedule.vue` |

## Serviços do usuário

```javascript
filterCrud([{ name: "userId", model: localStorage.getItem("userId") }], "users/products")
```

- `availableQuantity > 0` → pode agendar
- Produtos `type === "SCHEDULED"` → fluxo de agendamento

## Flags especiais

| Flag | Efeito |
|---|---|
| `isRetirementPlan` | Oculta pesquisa e simplifica welcome |
| Patrocínio (`companyNameSignIn`) | Welcome personalizado, mentorias coletivas |

## Simulador

- Apresentação: `/interviewSimulatorPresentation`
- Uso: `/interviewSimulator`
- Verificar acesso ativo (expiresDate, periodTest no localStorage)

## Mobile

Padrão: `window.mobileAndTabletCheck()` → componentes `*Mobile.vue`

## Doc produto

- `docs/04-plataforma-logada/painel-do-ex-colaborador.md`
- `docs/05-produtos-e-servicos/`
- `docs/07-jornadas/jornada-ex-colaborador-patrocinado.md`
