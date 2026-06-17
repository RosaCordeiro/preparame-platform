---
name: preparame-crud-admin
description: >-
  Cria e mantém telas CRUD admin Prepara.me com CrudQuery, CrudRegister,
  saveCrud, filterCrud e openEditCrud. Use ao adicionar entidades admin,
  filtros, colunas ou formulários de cadastro.
---

# Prepara.me — CRUD Admin

## Padrão listagem

```vue
<template>
  <div class="domain-crud">
    <CrudQuery :title="title" :breadcrumbs="breadcrumbs"
      :filters="filters" :columns="columns" :url="url" />
  </div>
</template>
```

- `url`: endpoint sem barra (ex. `"products"`)
- `filters` / `columns`: objetos declarativos com label, name, type, model

## Padrão cadastro

```vue
<CrudRegister :breadcrumbs="breadcrumbs" :title="title"
  :tables="tables" :registerType="registerType" />
```

- `registerType`: `"parentChild"` ou conforme existente
- `tables.mainTable.apiUrl`: `"/products"`
- `registerColumns`: campos do formulário

## Utils — sempre reutilizar

| Função | Uso |
|---|---|
| `saveCrud(url, data, method?)` | POST/PUT |
| `filterCrud(filters, url, columns?)` | GET com query |
| `openEditCrud(id, url, fields)` | Carregar edit |
| `removeCrud(selected, url)` | DELETE |

Import de `components/general/crud/utils/`.

## Tipos de campo comuns

Input, Select, Decimal, Date, DialogSelect, TextEditor

Select com `{ label, value }`. DialogSelect com `options.table` para lookup.

## Rotas

Arquivo dedicado `domain.route.js`:
- `/domain` → QueryCrud
- `/domain/new` → RegisterCrud
- `/domain/:id` → RegisterCrud

## Referência

Copiar `ProductsQueryCrud.vue` + `ProductsRegisterCrud.vue` + `products.route.js`.

Skills detalhadas:
- **Usar/estender:** `preparame-crud-usar-componentes`
- **Criar entidade nova:** `preparame-crud-criar-componentes`

## Doc produto

`docs/09-gestao-operacional/` para regras de negócio das entidades.
