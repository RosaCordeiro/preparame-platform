# Agente: Integrações

## Missão

Comunicação com API externa, pagamentos, analytics e utilitários transversais (upload, download, notificações).

## Escopo

```
src/boot/axios.js, notification.js, gtag-ads.js, apex.js
src/global.js
src/tools/
src/utils/downloadFile.js, refreshToken.js
src/components/gtm.js
```

## Quando acionar

- Novos endpoints axios
- Tratamento de erro/sucesso global
- Pagamento (carrinho, orders, Pagar.me)
- Google Analytics / Ads
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
- `vue-gtag` UA-151306939-1 no router
- `gtag-ads.js` boot — AW-304198855
- Eventos via `src/components/gtm.js`

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
