# Catálogo de tipos de campo CRUD

Arquivos em `src/components/general/crud/templates/`.

| type | Arquivo | Uso |
|---|---|---|
| Input | Input.vue | Texto simples |
| Select | Select.vue | Dropdown com options `{ label, value }` |
| DialogSelect | DialogSelect.vue | Lookup modal — `options: { table, label, value }` |
| Decimal | Decimal.vue | Valores monetários/decimais |
| Integer | Integer.vue | Números inteiros |
| Boolean | Boolean.vue | Verdadeiro/falso |
| Date | Date.vue | Data (formato dd/mm/yyyy no submit) |
| DateTime | DateTime.vue | Data e hora |
| TextArea | TextArea.vue | Texto multilinha |
| TextEditor | TextEditor.vue | Editor rico |
| Color | Color.vue | Seletor de cor |
| InputFile | InputFile.vue | Upload de arquivo |
| StateSelect | StateSelect.vue | UF (estados BR) |
| CitySelect | CitySelect.vue | Cidade (depende de estado) |
| Default | Default.vue | Fallback se type inválido |

## DialogSelect — config

```javascript
companyId: {
  label: "Empresa",
  name: "companyId",
  type: "DialogSelect",
  options: {
    table: "companies",      // endpoint filterCrud
    label: "name",           // campo exibido
    value: "id",             // campo do valor
  },
  model: "",
  visible: true,
  row: 1,
  col: 1,
  size: "6",
}
```

## InputFile — save customizado

`InputFile` popula model com File object. Em `save()`, montar `FormData` — ver `MaterialsRegisterCrud.vue`.

## Layout grid

- `row` + `col` organizam campos em linhas
- `size` = classes Quasar `col-{size}` (1–12)
- `adjustColumnsAndRowsRegister` agrupa por `row` automaticamente no CrudRegister

## Colunas de listagem (CrudQuery)

```javascript
{
  name: "status",
  label: "Situação",
  align: "left",
  field: "status.label",   // dot notation para objetos
  sortable: true,
  visible: true,
},
{
  name: "actions",
  label: "Ações",
  field: "actions",
  sortable: false,
  visible: true,
}
```

Sempre incluir coluna `actions` para editar/excluir.
