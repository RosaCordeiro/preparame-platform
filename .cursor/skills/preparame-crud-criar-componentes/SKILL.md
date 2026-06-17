---
name: preparame-crud-criar-componentes
description: >-
  Cria novos wrappers CRUD no padrão Prepara.me — QueryCrud, RegisterCrud,
  rotas platform e item SideNavMenu. Use ao adicionar nova entidade admin,
  nova tela de listagem/cadastro ou novo template de campo CRUD.
---

# Criar novos componentes CRUD

## Quando criar vs reutilizar

| Situação | Ação |
|---|---|
| Novo campo em entidade existente | Editar `*RegisterCrud.vue` existente |
| Nova coluna/filtro | Editar `*QueryCrud.vue` existente |
| **Nova entidade admin** | Seguir este guia completo |
| Novo tipo de input | Criar `templates/NovoTipo.vue` + usar `type: "NovoTipo"` |

## Passo a passo — nova entidade

### 1. QueryCrud (listagem)

Arquivo: `src/components/platform/{domain}Crud/{Entity}QueryCrud.vue`

Copiar de `ProductsQueryCrud.vue`. Alterar:
- `title`, `url`, `breadcrumbs`
- `filters` — campos de busca
- `columns` — colunas visíveis + `actions`

```vue
<template>
  <div class="entity-crud">
    <CrudQuery
      :title="title"
      :breadcrumbs="breadcrumbs"
      :filters="filters"
      :columns="columns"
      :url="url"
    />
  </div>
</template>

<script>
import CrudQuery from "../../general/crud/CrudQuery.vue";
```

**Import correto:** `import CrudQuery from "../../general/crud/CrudQuery.vue"`

### 2. RegisterCrud (cadastro)

Arquivo: `src/components/platform/{domain}Crud/{Entity}RegisterCrud.vue`

Copiar de `MaterialsRegisterCrud.vue` (simples) ou `ProductsRegisterCrud.vue` (com filhos).

Obrigatório:
- `registerType`: `"unique"` ou `"parentChild"`
- `tables.mainTable.apiUrl`
- `tables.mainTable.registerColumns`
- `editUrl` igual ao path base
- `created()` → `openEditCrud(this.id, this.editUrl, this.tables)`
- `methods.save(data)` → `saveCrud(...)`

### 3. Rotas

Arquivo: `src/router/platform/{entity}.route.js`

```javascript
import Platform from "../../layouts/Platform.vue";
import EntityQueryCrud from "../../components/platform/entityCrud/EntityQueryCrud.vue";
import EntityRegisterCrud from "../../components/platform/entityCrud/EntityRegisterCrud.vue";

const entityRoutes = [
  {
    path: "/entities",
    components: { site: Platform },
    children: [{ path: "/", components: { content: EntityQueryCrud } }],
  },
  {
    path: "/entities/new",
    components: { site: Platform },
    children: [{ path: "/", components: { content: EntityRegisterCrud } }],
    props: { userTypes: ["ADMIN"] },
  },
  {
    path: "/entities/:id",
    components: { site: Platform },
    children: [{ path: "/", components: { content: EntityRegisterCrud } }],
    props: { userTypes: ["ADMIN"] },
  },
];

export { entityRoutes };
```

Importar em `src/router/platform/index.js`:

```javascript
import { entityRoutes } from "./entity.route";
// adicionar ...entityRoutes no array
```

### 4. Menu (se visível)

Em `SideNavMenu.vue`, adicionar item no perfil `ADMIN` (ou outro):

```javascript
{ icon: "mdi-icon-name", label: "Entidades", url: "entities" }
```

### 5. Doc produto (se nova funcionalidade)

Atualizar `docs/09-gestao-operacional/` se expõe feature ao usuário.

## registerType parentChild

Quando entidade tem filhos (1-N inline):

```javascript
registerType: "parentChild",
tables: {
  mainTable: { apiUrl: "/products", registerColumns: { ... } },
  childTable: {
    content: "productContent",
    apiUrl: "/products/:id/productContents",
    removeUrl: "products/productContents",
    registerColumns: { ... },
    tableColumns: [ ... ],
    tableData: [],
  },
}
```

No `save()`:
1. Salvar mainTable → obter `id`
2. Substituir `:id` na apiUrl do child
3. Salvar cada item de `data.childTable`

Referência: `ProductsRegisterCrud.vue`.

## Criar novo template de campo

Só quando nenhum `type` existente serve.

1. Criar `src/components/general/crud/templates/MeuTipo.vue`
2. Props: `col` (objeto do registerColumns)
3. Emitir/atualizar via `alterData` do parent ou v-model em `col.model`
4. Copiar estrutura de `Input.vue` ou `Select.vue`
5. Usar `type: "MeuTipo"` — `FieldCrudDynamicTemplate` importa `./MeuTipo` automaticamente

**Nome do arquivo = valor de `type` exatamente** (case-sensitive).

## Checklist final

```
- [ ] EntityQueryCrud.vue criado
- [ ] EntityRegisterCrud.vue com save()
- [ ] entity.route.js com /, /new, /:id
- [ ] Import em router/platform/index.js
- [ ] userTypes na rota se restrito
- [ ] SideNavMenu atualizado
- [ ] Tipos de campo existentes reutilizados
- [ ] yarn lint
```

## Entidades existentes (referência)

| Entidade | Query | Register |
|---|---|---|
| Produtos | ProductsQueryCrud | ProductsRegisterCrud |
| Empresas | CompaniesQueryCrud | CompaniesRegisterCrud |
| Usuários | UsersQueryCrud | UsersRegisterCrud |
| Materiais | MaterialsQueryCrud | MaterialsRegisterCrud |
| Especialistas | SpecialistsQueryCrud | SpecialistsRegisterCrud |

Lista completa: `src/components/platform/**/*QueryCrud.vue`

## Erros comuns

| Erro | Causa |
|---|---|
| Salvar não funciona | Falta method `save()` no wrapper |
| Formulário vazio na edição | `openEditCrud` não chamado ou editUrl errado |
| Campo não aparece | `visible: false` ou row/col incorretos |
| Select salva `[object Object]` | Falta `{ label, value }` — CrudRegisterButtons extrai `.value` |
| 401 na API | Token — ver boot/axios |

## Referências

- [Usar componentes CRUD](../preparame-crud-usar-componentes/SKILL.md)
- [Tipos de campo](../preparame-crud-usar-componentes/reference.md)
- [Agente plataforma CRUD](../../docs/desenvolvimento/agents/plataforma-crud.md)
