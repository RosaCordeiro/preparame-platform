---
name: preparame-crud-usar-componentes
description: >-
  Usa os componentes CRUD genéricos do Prepara.me — CrudQuery, CrudRegister,
  templates de campo e utils saveCrud/filterCrud/openEditCrud/removeCrud.
  Use ao estender telas admin existentes, ajustar filtros/colunas/campos ou
  chamar API via padrão CRUD sem criar entidade nova.
---

# Usar componentes CRUD genéricos

## Onde ficam

```
src/components/general/crud/
├── CrudQuery.vue          # Listagem
├── CrudRegister.vue       # Formulário
├── CrudQueryFilter.vue
├── CrudQueryTable.vue
├── CrudRegisterForm.vue
├── CrudRegisterButtons.vue
├── templates/             # Tipos de campo
└── utils/                 # saveCrud, filterCrud, openEditCrud, removeCrud
```

## CrudQuery — listagem

Wrapper declarativo passa props para `<CrudQuery>`:

| Prop | Uso |
|---|---|
| `title` | Título da página |
| `url` | Endpoint API sem barra (ex. `"products"`) |
| `filters` | Objeto de filtros (label, name, type, model, options) |
| `columns` | Colunas da tabela (name, label, field, visible) |
| `breadcrumbs` | `[{ title, to }]` |
| `blockCreateNew` | Oculta botão novo |
| `blockRemove` | Oculta exclusão |

**Comportamento automático:** carrega dados via `filterCrud`, exclui via `removeCrud`, navega para `/url/new` e `/url/:id`.

### Colunas com label aninhado

Para enums retornados como objeto: `field: "status.label"`.

### Filtros Select

Incluir opção `{ label: "Todos", value: "" }` quando aplicável.

## CrudRegister — formulário

| Prop | Uso |
|---|---|
| `title` | String ou `{ mainTable, childTable }` |
| `tables` | `mainTable` (+ `childTable` se parentChild) |
| `registerType` | `"unique"` ou `"parentChild"` |
| `breadcrumbs` | Navegação |

### Estrutura mainTable

```javascript
mainTable: {
  id: null,
  apiUrl: "/products",
  registerColumns: { /* campos — ver reference.md */ }
}
```

### registerType

| Valor | Quando |
|---|---|
| `unique` | Formulário simples (ex. Materials) |
| `parentChild` | Tabela principal + linhas filhas (ex. Products + productContents) |

### Carregar edição

No `created()` do wrapper:

```javascript
this.id = this.$router.history.current.params.id;
openEditCrud(this.id, this.editUrl, this.tables);
```

### Salvar — obrigatório

O wrapper **deve** expor método `save(data)` — chamado por `CrudRegisterButtons`:

```javascript
methods: {
  save: async function (data) {
    return await saveCrud(this.tables.mainTable.apiUrl, data.mainTable);
  }
}
```

`data` contém `mainTable` e, se parentChild, `childTable` (array).

## Utils — uso direto (fora de telas CRUD)

```javascript
import { filterCrud } from "src/components/general/crud/utils/filterCrud";
import { saveCrud } from "src/components/general/crud/utils/saveCrud";
import { openEditCrud } from "src/components/general/crud/utils/openEditCrud";
import { removeCrud } from "src/components/general/crud/utils/removeCrud";
```

| Função | Assinatura |
|---|---|
| `filterCrud` | `(filters[], url, columns?, headers?)` |
| `saveCrud` | `(url, data, method?, format?)` |
| `openEditCrud` | `(id, url, fields/tables)` |
| `removeCrud` | `(selected, url)` |

Auth: Bearer token injetado automaticamente via utils.

## Templates de campo (type)

Carregados dinamicamente por `FieldCrudDynamicTemplate.vue`:

Input, Select, Decimal, Integer, Boolean, Date, DateTime, TextArea, TextEditor, Color, InputFile, DialogSelect, StateSelect, CitySelect, Default

**Catálogo completo:** [reference.md](reference.md)

### Campos comuns em registerColumns

```javascript
name: {
  label: "Nome",
  name: "name",
  size: "6",    // col-* Quasar
  row: 1,
  col: 1,
  model: "",
  type: "Input",
  visible: true,
}
```

- `visible: false` — oculto (ex. id)
- Select: `options: [{ label, value }]`
- DialogSelect: `options: { table, label, value }`

## Slots e extensões

- `CrudQuery`: slot `title`, slot default na tabela
- `CrudRegister`: slot `belowTable`, slot default (substitui botões se `showActionButtons`)

## Casos especiais já existentes

| Caso | Onde ver |
|---|---|
| Upload FormData | `MaterialsRegisterCrud.vue` — method save customizado |
| parentChild + save filho | `ProductsRegisterCrud.vue` — replace `:id` na apiUrl |
| DialogSelect lookup | Campos com `options.table` |

## Checklist ao usar (não criar do zero)

- [ ] Alterei só config (filters/columns/registerColumns) no wrapper existente?
- [ ] `url` / `apiUrl` alinhados com backend?
- [ ] Method `save()` existe no RegisterCrud wrapper?
- [ ] Select/DialogSelect com `{ label, value }`?
- [ ] `openEditCrud` no created quando rota tem `:id`?

## Não fazer

- Reimplementar tabela/filtro/form do zero
- Criar novo template de campo se um `type` existente serve
- Hardcodar URL da API — usar paths relativos como nos exemplos

## Referências

- [Catálogo de tipos de campo](reference.md)
- [Criar novos CRUDs](../preparame-crud-criar-componentes/SKILL.md)
- [ProductsQueryCrud.vue](../../../src/components/platform/productsCrud/ProductsQueryCrud.vue)
- [MaterialsRegisterCrud.vue](../../../src/components/platform/materials/MaterialsRegisterCrud.vue)
