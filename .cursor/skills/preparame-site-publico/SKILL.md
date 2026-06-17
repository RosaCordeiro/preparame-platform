---
name: preparame-site-publico
description: >-
  Site público Prepara.me — home, landings B2B, catálogo ProductList,
  carrinho ShoppingCart, Kit Pro, patrocínio e menuItems. Use ao alterar
  components/site/, layouts públicos ou router/site/.
---

# Prepara.me — Site Público

## Rotas principais

| Rota | Componente |
|---|---|
| `/` | novo-site/HomePage |
| `/ProductList` | ProductList |
| `/ProductDetails` | ProductDetails |
| `/ProductSchedule` | ProductSchedule |
| `/ShoppingCart` | ShoppingCart |
| `/KitRecolocacao` | KitProPage |
| `/demissaohumanizada` | ResponsibleDemission |
| `/patrocinio/:companyName` | HomePageCompany |

Registrar novas rotas em `router/site/site.route.js`.

## Menu

`components/site/navMenu/menuItems.js` — blocos Para você, Para empresas, Sobre nós.

## Fluxo de compra

1. `GET /products?onlyAdmin=false` → catálogo
2. ProductDetails → adicionar ao carrinho
3. ProductSchedule (se serviço agendado)
4. ShoppingCart → pagamento
5. Carrinho em `localStorage` key `cart`

## Layouts

- `NewLayout` — home e páginas novo-site
- `Site` — páginas internas com header/footer clássico
- `HomePageCompany` — patrocínio com cores/logo da empresa

## Padrões

- Componentes em `components/site/` por feature (productDetails, kitProPage, etc.)
- SCSS em `src/css/pages/` quando necessário
- GTM: `src/components/gtm.js` para eventos
- **Não** usar CrudQuery/CrudRegister no site

## Doc produto

- `docs/03-site-publico/`
- `docs/07-jornadas/jornada-compra-individual.md`
