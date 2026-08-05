# Agente: Integrações

## Missão

Comunicação com API externa, pagamentos, analytics e utilitários transversais (upload, download, notificações).

## Escopo

```
src/boot/axios.js, notification.js, apex.js
src/global.js
src/tools/
src/utils/downloadFile.js, refreshToken.js
```

## Quando acionar

- Novos endpoints axios
- Tratamento de erro/sucesso global
- Pagamento (carrinho, orders, Pagar.me)
- Upload/download de arquivos
- Refresh token em 401

## Padrões

### HTTP
- Base: `baseApiUrl` de `global.js`
- Auth header: `Bearer ${localStorage.token}`
- Erros: `showError(err)` — Quasar Notify
- Sucesso: `showSuccess()` / `showSucess()` (typo legado)

### Pagamentos
- Orders: `/orders`, `/orders/pagarme`, `/orders/item`
- Helper: `src/tools/requestPagarMeKitPro.js`
- Formas: boleto e cartão (visão usuário)

### Analytics

- Removido do app (2026-08): `vue-gtag` / `UA-151306939-1`, boot `gtag-ads` / `AW-304198855`, e helper `src/components/gtm.js` (dataLayer).
- Novo rastreador exclusivo do app: feat futura (não reutilizar IDs do site).
- `vue-google-charts` permanece (renderização de gráficos, não é analytics).

## Checklist

- [ ] Usar `baseApiUrl` — nunca hardcodar URL de API
- [ ] Headers de auth nos requests autenticados
- [ ] Erros tratados com `showError`
- [ ] Não commitar secrets ou chaves de pagamento
- [ ] `yarn lint` passa

## Skill Cursor

`preparame-pagamentos-pedidos` (pagamentos) + interceptors em `preparame-router-auth`

## Referências

- [Pagamentos](../../09-gestao-operacional/pagamentos.md)
- [Arquitetura frontend](../arquitetura-frontend.md)
- [boot/axios.js](../../../src/boot/axios.js)
