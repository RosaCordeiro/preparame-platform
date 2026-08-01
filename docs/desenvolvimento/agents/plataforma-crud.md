# Agente: Plataforma CRUD

## Missão

Criar e manter telas administrativas de listagem e cadastro — empresas, usuários, produtos, especialistas, materiais, simulador, mentorias coletivas.

## Escopo

```
src/components/general/crud/
src/components/platform/*Crud/
src/components/platform/materials/
src/components/platform/mentoring/
src/components/platform/simulatorVideo*
src/router/platform/*.route.js (rotas CRUD)
```

## Quando acionar

- Nova entidade admin (list + form)
- Novos filtros/colunas em listagem
- Campos em formulário de cadastro
- Rotas `/entities`, `/entities/new`, `/entities/:id`
- Props `userTypes` em rotas restritas

## Padrões

### Listagem (`*QueryCrud.vue`)
- Wrapper fino sobre `<CrudQuery>` com `title`, `url`, `filters`, `columns`, `breadcrumbs`

### Cadastro (`*RegisterCrud.vue`)
- Wrapper sobre `<CrudRegister>` com `tables`, `registerType`, `editUrl`
- `registerColumns` declarativo (type: Input, Select, Decimal, DialogSelect…)
- Hooks: `openEditCrud`, `saveCrud` nos métodos do componente

### Utils (não duplicar lógica)
- `saveCrud(url, data, method)`
- `filterCrud(filters, url, columns)`
- `openEditCrud(id, url, fields)`
- `removeCrud(selected, url)`

### Rotas
- Registrar em arquivo `*.route.js` dedicado
- Importar em `router/platform/index.js`
- `props: { userTypes: ['ADMIN'] }` quando restrito

## Checklist

- [ ] Segui template de QueryCrud/RegisterCrud existente (ex.: Products)
- [ ] URL da API alinhada com padrão do backend (sem `/` duplicado)
- [ ] `userTypes` na rota se perfil restrito
- [ ] Breadcrumbs e título em português
- [ ] Item no `SideNavMenu.vue` se nova área admin
- [ ] `yarn lint` passa

## Skill Cursor

| Situação | Skill |
|---|---|
| Estender CRUD existente | `preparame-crud-usar-componentes` |
| Nova entidade admin | `preparame-crud-criar-componentes` |
| Visão geral CRUD | `preparame-crud-admin` |

## Referências

- [Gestão operacional](../../09-gestao-operacional/)
- [Administrador da plataforma](../../02-quem-usa/administrador-da-plataforma.md)
- [ProductsQueryCrud.vue](../../../src/components/platform/productsCrud/ProductsQueryCrud.vue)
