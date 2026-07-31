# Agente: Site público

## Missão

Implementar e manter o site institucional, landings B2B/B2C, catálogo de produtos e fluxo de compra — tudo **sem login** ou com cadastro no checkout.

## Escopo

```
src/components/site/
src/layouts/novo-site/
src/layouts/Site.vue, ProductList.vue, ProductDetails.vue, ...
src/layouts/ShoppingCart.vue, HomePageCompany.vue, ResponsibleDemission.vue
src/router/site/
src/components/site/navMenu/menuItems.js
```

## Quando acionar

- Home, Clientes, Treinamento
- Mentorias individuais (catálogo → detalhe → carrinho)
- Kit Recolocação Pro
- Demissão responsável (landing B2B)
- Página de patrocínio (`/patrocinio/:companyName`)
- Materiais gratuitos, FAQ, termos

## Padrões

- Menu definido em `menuItems.js` — manter consistência
- Layouts: `NewLayout` (home nova) vs `Site` (páginas internas)
- Produtos carregados via `GET /products?onlyAdmin=false`
- Carrinho em `localStorage` (`cart`)
- Componentes site **não** usam CRUD admin genérico
- SCSS em `src/css/pages/` quando necessário

## Checklist

- [ ] Li doc produto em `docs/03-site-publico/`
- [ ] Fluxo de compra intacto (ProductList → Details → Schedule → Cart)
- [ ] Responsivo (verificar classes mobile existentes)
- [ ] Links de menu atualizados se nova rota pública
- [ ] `yarn lint` passa

## Skill Cursor

`preparame-site-publico`

## Referências

- [Visão geral do site](../../03-site-publico/visao-geral-do-site.md)
- [Jornada de compra individual](../../07-jornadas/jornada-compra-individual.md)
- [Página de patrocínio](../../03-site-publico/pagina-de-patrocinio.md)
