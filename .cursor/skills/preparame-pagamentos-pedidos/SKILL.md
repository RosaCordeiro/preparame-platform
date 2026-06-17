---
name: preparame-pagamentos-pedidos
description: >-
  Pagamentos, carrinho, pedidos e integração Pagar.me no Prepara.me frontend.
  Use ao alterar ShoppingCart, Orders, checkout, tools de pagamento ou
  endpoints /orders.
---

# Prepara.me — Pagamentos e Pedidos

## Fluxo B2C

1. Site → carrinho (`localStorage.cart`)
2. `ShoppingCart.vue` → checkout
3. Pagamento boleto ou cartão
4. Confirmação → serviço liberado na conta USER
5. Acompanhamento: `/orders` → `Orders.vue`

## Endpoints comuns

| Endpoint | Uso |
|---|---|
| `POST /orders` | Criar pedido |
| `POST /orders/pagarme` | Processar pagamento |
| `POST /orders/item` | Item do pedido |
| `GET /products/:id` | Detalhe produto (Kit Pro usa ID fixo) |

## Pagar.me

Helper: `src/tools/requestPagarMeKitPro.js`

Kit Recolocação Pro adiciona produto ao carrinho e redireciona para `/ShoppingCart`.

## Patrocínio / atribuição manual

Sem checkout — admin usa `addProductToUser` ou pacote empresarial.

## Tratamento de erros

Sempre `showError(err)` de `global.js` em chamadas axios.

## HTTP

```javascript
import { baseApiUrl, showError } from "src/global.js";
import axios from "axios";

axios.get(`${baseApiUrl}/orders`, {
  headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
}).catch(showError);
```

## Regras produto

- Pagamento confirmado antes de liberar serviço
- Ver `docs/09-gestao-operacional/pagamentos.md`

## Não commitar

Chaves API, tokens Pagar.me, credenciais.
