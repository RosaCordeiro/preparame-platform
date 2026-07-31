---
titulo: "Dashboard RH — filtros comparativos com Quasar nativo"
slug: "dashboard-rh-filtros-quasar"
criado: 2026-06-19
status: plano
depende-de: "feat/layout-rh-nova-versao (comparativo + cards já iniciados)"
---

# Dashboard RH — refatoração dos filtros (Quasar nativo)

## Problema atual

O `UiFilterField` **não usa o padrão Quasar para seleção**. Ele monta um `q-btn-dropdown` com lista manual de `q-checkbox` / ícones `mdi-radiobox-*` simulando radio.

Isso causa:

- Clique que não persiste ou não fecha o menu (comportamento estranho do dropdown)
- UX de **multiseleção** quando o modo comparativo precisa de **seleção única**
- Duplicação de lógica que o `q-select` já resolve (label, clear, teclado, acessibilidade)
- Modelo de dados `Array` forçado mesmo em single-select (`[]` ou `[valor]`)

**Conclusão:** não inventar componente de interação; usar **`q-select`** do Quasar 1 (já usado no projeto em CRUD, `StateSelect`, `CitySelect`, etc.).

---

## Princípio

| Camada | Responsabilidade |
|---|---|
| `UiFilterPanel` | Shell visual (título, chips, grid) — **manter** |
| `RhFilterSelect` (novo) | Wrapper fino: label + `q-select` + CSS RH — **sem lógica de dropdown custom** |
| `RhFilterPanel` | Composição dos campos por dimensão |
| `RhCompareFilters` | N conjuntos de `RhFilterPanel` + botão "+ Comparar filtro" |
| `DashBoardAnswers` | Estado, `loadParameters`, `buildReportFilters`, `compareResults` |

**Remover** a implementação atual de `UiFilterField` (dropdown manual). Opcionalmente manter o arquivo como reexport de `RhFilterSelect` para não quebrar imports legados.

---

## Componentes Quasar corretos por caso

### Modo comparativo RH (`COMPANY_ADMIN`, variant `rh`)

Cada dimensão = **um valor ou vazio** (equivale a “Todos”).

```vue
<q-select
  v-model="area"
  :options="areaOptions"
  label="Área"
  outlined
  dense
  clearable
  emit-value
  map-options
  options-dense
  :disable="disabled"
/>
```

| Prop | Motivo |
|---|---|
| `outlined` + `dense` | Alinha ao visual RH (campos compactos no painel) |
| `clearable` | “Todos” = `null` (sem filtro na API) |
| **sem** `multiple` | Seleção única — UX de radio/lista, não checkbox |
| `emit-value` + `map-options` | Opções `{ label, value }` para gênero, etnia, tipo demissão |
| `options-dense` | Lista longa (áreas, cargos) |

**Não usar:** `q-btn-dropdown`, `q-checkbox` em lista, ícones fake de radio.

### Modo legado ADMIN (`DashBoardAnswers` variant `legacy`)

Mantém **multiseleção** como hoje (várias áreas ao mesmo tempo):

```vue
<q-select
  v-model="area"
  :options="areaOptions"
  label="Área"
  outlined
  dense
  multiple
  use-chips
  clearable
  emit-value
  map-options
/>
```

Ou, se quiser paridade exata com o legado visual, manter temporariamente os `q-btn-dropdown` + checkbox **só no legacy** até migrar — mas o RH **não** deve usar esse padrão.

### Estado / Cidade

Reutilizar padrão existente:

- `StateSelect.vue` / `CitySelect.vue` usam `q-select` com `use-input` + `@filter`
- Para RH: mesmo `q-select` com busca, ou importar lógica desses componentes se as opções forem objetos `{ label, value }`

### Período

Opções são strings (`"2025-01"`, etc.) — `q-select` simples, single no comparativo, multiple no legado.

---

## Modelo de dados (comparativo)

### Hoje (problemático)

```js
compareFilterSets: [{
  area: [],      // array forçado
  unity: [],
  ...
}]
```

### Proposto

```js
compareFilterSets: [{
  id, label: "Filtro 1",
  period: null,    // string | null
  area: null,      // string | null  → department na API
  unity: null,
  role: null,
  dismissalType: null,
  gender: null,
  etnia: null,
  pcd: null,       // "Sim" | "Não" | null
  state: null,
  city: null,
}]
```

`buildReportFilters` converte para o contrato da API:

```js
if (set.area) filters.push({ name: "area", model: JSON.stringify([set.area]) });
```

Sem arrays vazios, sem `selectAll*` — o `q-select` com `clearable` substitui “Selecionar todos”.

---

## Fluxo de dados (comparativo)

```mermaid
flowchart TD
  A[RhCompareFilters] -->|v-model por campo| B[compareFilterSets]
  B -->|@change debounced| C[loadNpsSurveyAnswers]
  C --> D[loadParameters sem narrowing]
  D --> E[companies/config - opções completas]
  C --> F[Promise.all N x NPSSurveyAnswers]
  F --> G[compareResults]
  G --> H[DashBoardRhMetrics - linhas Filtro 1/2 + Média Geral]
```

Regras já validadas no plano anterior (manter):

1. `await loadParameters()` — nunca disparar relatório antes do config
2. `loadParameters` no RH **sem** passar filtros do Filtro 1 (opções completas para todos os conjuntos)
3. `loadRequestId` — não descartar requisição do Filtro 2
4. Um request por conjunto em `compareFilterSets`

---

## Estrutura de arquivos

```
src/components/general/ui/
  UiFilterPanel.vue          # manter (shell)

src/components/platform/home/company/
  RhFilterSelect.vue         # NOVO: label + q-select (props: mode single|multiple)
  RhFilterPanel.vue          # trocar UiFilterField → RhFilterSelect
  RhCompareFilters.vue       # manter estrutura; remover single-select hack
  RhFilterField.vue          # reexport RhFilterSelect (compat)

src/components/platform/home/templates/
  DashBoardAnswers.vue       # compareFilterSets com scalars; buildReportFilters
  DashBoardRhMetrics.vue       # já consome compareResults
```

**Deletar** lógica de dropdown/checkbox/radio de `UiFilterField.vue` (ou substituir arquivo inteiro por reexport).

---

## Mapeamento campo → opções

| Campo UI | Fonte `parameters` | Formato opções `q-select` |
|---|---|---|
| Período | `parameters.period` | `string[]` → `{ label: p, value: p }` |
| Unidade | `parameters.unity` | idem |
| Área | `parameters.area` | idem (department no backend) |
| Cargo | `parameters.role` | idem (position) |
| Tipo demissão | `parameters.dismissalType` | `{ label: from dismissalTypeOptions, value }` |
| Gênero | `parameters.gender` | `{ label: from genderOptions, value }` |
| Etnia | `parameters.etnia` | `{ label: from etniaOptions, value }` |
| PCD | `parameters.pcd` | `["Sim","Não"]` |
| Estado | `parameters.state` | string ou objeto conforme API |
| Cidade | `parameters.city` | idem |

Helper único em `RhFilterPanel`:

```js
toSelectOptions(rawList, labelFn) {
  return (rawList || []).map((item) =>
    typeof item === "object" ? item : { label: labelFn?.(item) ?? item, value: item }
  );
}
```

---

## Cards e timeline (fora do escopo deste plano, já iniciado)

- Comparativo nos cards: `compareResults` → linhas por `Filtro N` + `Média Geral`
- Clique no card → `q-expansion-item` ou slot + `ChartApex` timeline
- Não misturar com refactor de filtros na mesma PR

---

## Ordem de implementação (PRs)

### PR1 — Filtros Quasar (foco deste plano)

1. Criar `RhFilterSelect.vue` com `q-select` (props `multiple: Boolean`)
2. Refatorar `RhFilterPanel` para usar `RhFilterSelect`
3. Migrar `compareFilterSets` para valores escalares (`null` = todos)
4. Ajustar `buildReportFilters`, `RhCompareFilters`, `pruneFilterSet`
5. Remover `UiFilterField` dropdown custom
6. Testar manualmente com seed (Operações vs Tecnologia)

### PR2 — Comparativo cards + timeline (já parcialmente feito)

Revisar após PR1 estável.

### PR3 — Layout USER (plano `layout-user-shell-rh`)

Independente.

---

## Critérios de aceite (filtros)

- [ ] Clicar em Área abre lista Quasar padrão (`q-select`); seleção aparece no campo
- [ ] `clearable` limpa filtro (volta “Todos” / placeholder)
- [ ] Filtro 1 e Filtro 2 independentes; opções **não** encolhem quando Filtro 1 muda
- [ ] Filtro 2 altera valores nos cards quando área diferente
- [ ] Modo legado ADMIN continua com multiseleção (`multiple` + `use-chips`)
- [ ] `yarn lint` passa
- [ ] Nenhum `q-btn-dropdown` com checkbox no painel RH

---

## Teste manual sugerido

Login: `teste.empresa@prepara.me` / `Teste@123`

| Passo | Ação | Esperado |
|---|---|---|
| 1 | Filtro 1 → Área → Operações | Campo mostra “Operações”; e-NPS reflete subset |
| 2 | + Comparar filtro | Aparece Filtro 2 |
| 3 | Filtro 2 → Área → Tecnologia | Campo mostra “Tecnologia” |
| 4 | Card e-NPS | Duas linhas (Filtro 1 / Filtro 2) + Média Geral, valores distintos |
| 5 | Clear no Filtro 1 | Volta “todos”; linha Filtro 1 = empresa inteira |

---

## Relacionado

- [Layout USER shell RH](./2026-06-19-layout-user-shell-rh.md)
- [Arquitetura frontend](../arquitetura-frontend.md)
- Legado filtros: `DashBoardAnswers.vue` (variant legacy, `q-btn-dropdown`)
