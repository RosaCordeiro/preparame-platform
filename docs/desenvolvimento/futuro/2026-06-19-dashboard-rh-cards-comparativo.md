---
titulo: "Dashboard RH — cards principais e comparativo"
slug: "dashboard-rh-cards-comparativo"
criado: 2026-06-19
status: plano
depende-de: "PR1 filtros Quasar + fix lessThanFive COMPANY_ADMIN"
---

# Dashboard RH — correção dos cards e modo comparativo

## Sintomas reportados

1. **Cards principais sumiram** — grid de métricas (e-NPS, Risco, Marca, etc.) não aparece ou some após interação.
2. **Cards visíveis não têm comparativo** — ao adicionar Filtro 2 ou aplicar filtros, as linhas comparativas não aparecem como esperado.

O que **continua visível**: cabeçalho RH, painel de filtros (`RhCompareFilters`) e seções de pesquisa (`DashBoardRhSurveys` — mapa de sentimentos, pós-demissão, perguntas).

---

## Arquitetura atual (como deveria funcionar)

```
DashBoardAnswers
├── RhCompareFilters          → compareFilterSets (estado dos filtros)
├── loadNpsSurveyAnswers()
│     ├── getReportFilterSets()     → N conjuntos (Filtro 1, 2, 3)
│     ├── Promise.all(N × API)      → reports[]
│     └── compareResults[]          → { label, nps, laborRisk, ... }
└── DashBoardRhMetrics
      ├── metricCards (8 cards)
      ├── compareRowsFor(field)     → linhas por compareResults
      └── UiMetricCard / UiStatCard → displayRows
```

**Spec desejada nos cards** (`UiMetricCard.displayRows`):

| Cenário | Linhas no card |
|---|---|
| Sem comparativo (1 conjunto, sem filtro) | **Sua Empresa** + **Média Geral** |
| 1 conjunto com filtros | **Filtro 1** (ou resumo do filtro) + **Média Geral** |
| 2–3 conjuntos comparativos | **Filtro 1**, **Filtro 2**, … + **Média Geral** |

---

## Diagnóstico

### P0 — Cards principais somem (crash silencioso)

**Causa provável:** `DashBoardRhMetrics.metricCards` chama `metricValue()` → `removePercent()` com valor `undefined` quando `compareResults` está vazio.

```js
// DashBoardAnswers.vue
removePercent(value) {
  return value.toString().replace("%", "") * 1;  // 💥 se value === undefined
}

// DashBoardRhMetrics.vue
metricValue(field) {
  return this.removePercent(this.primaryResult[field]); // primaryResult = {} quando compareResults = []
}
```

**Quando `compareResults` fica vazio:**

| Momento | O que acontece |
|---|---|
| Primeiro render (antes da API) | `compareResults = []` → computed quebra |
| `watch companyId` | zera `compareResults = []` antes do reload |
| Erro de API / request abortado | lista pode ficar vazia |

**Efeito:** `DashBoardRhMetrics` falha no render; **só as seções abaixo** (`DashBoardRhSurveys`) continuam na tela — parece que “os cards principais sumiram”.

**Evidência no código:** `dashboardsLoaded` existe mas **não** envolve `DashBoardRhMetrics` com `v-if` (diferente do `DashBoardAnswersOld`). O grid depende 100% do computed `metricCards` sem guarda.

---

### P1 — Comparativo não aparece / parece errado

**Causa A — Modo comparativo ligado cedo demais**

`UiMetricCard` e `UiStatCard`:

```js
if (this.compareRows.length > 0) {
  // usa SOMENTE linhas de compareResults — descarta "Sua Empresa"
} else {
  // fallback: Sua Empresa + Média Geral
}
```

`DashBoardRhMetrics.hasCompareRows`:

```js
return this.compareResults.length > 0;  // true assim que a 1ª API responde
```

Ou seja: **sempre** após o primeiro load entra no ramo comparativo, mostrando **“Filtro 1”** em vez de **“Sua Empresa”**, mesmo sem segundo conjunto e sem filtro selecionado.

**Causa B — Critério de “modo comparativo” errado**

Comparativo real exige:

- `compareFilterSets.length > 1` **OU**
- pelo menos um conjunto com filtro ativo (`hasFilterValue`)

Hoje o critério é só `compareResults.length > 0`, que é sempre verdadeiro após qualquer load bem-sucedido.

**Causa C — Labels pouco informativos**

Linhas mostram só `Filtro 1` / `Filtro 2`. Não há subtítulo com área/cargo selecionado (ex.: “Operações” vs “Tecnologia”), dificultando ver que o comparativo funciona.

**Causa D — `lessThanFive` global no card**

`DashBoardRhMetrics` passa `lessThanFive` do **primeiro** relatório para todo o card, mas `compareRowsFor` já tem `insufficient: result.lessThanFive` por linha. O prop global pode mascarar estado por conjunto.

---

### P2 — Timeline vs comparativo (secundário)

`loadMetricTimeline` já monta séries por `filterSets` + “Média Geral”. Deve seguir a mesma regra de modo comparativo dos cards para não divergir.

---

## O que NÃO é o problema

- Filtros Quasar (`RhFilterSelect`) — funcionando.
- API múltipla (`Promise.all` em `filterSets`) — estrutura correta.
- CSS `rh-dashboard-grid` — importado em `app.scss`; não esconde cards por `display: none`.

---

## Plano de correção

### PR-A — Estabilidade dos cards (P0, fazer primeiro)

**Objetivo:** grid nunca quebra, mesmo com `compareResults` vazio ou métricas `N/A`.

| # | Ação | Arquivo |
|---|---|---|
| A1 | Tornar `removePercent` seguro (`null`/`undefined`/`"N/A"` → `NaN` sem throw) | `DashBoardAnswers.vue` |
| A2 | `metricValue` / `compareRowsFor` ignoram valores inválidos | `DashBoardRhMetrics.vue` |
| A3 | Não zerar `compareResults` no `watch companyId` até novos dados chegarem (manter stale) **ou** `v-if="compareResults.length"` com skeleton | `DashBoardAnswers.vue` |
| A4 | (Opcional) `v-if="compareResults.length > 0"` no grid + placeholder “Carregando indicadores…” | `DashBoardRhMetrics.vue` |

**Critério de aceite:**

- [ ] Abrir dashboard RH: 8 cards aparecem após load.
- [ ] Trocar empresa: cards não somem no meio do reload.
- [ ] Console sem `TypeError: Cannot read properties of undefined (reading 'toString')`.

---

### PR-B — Lógica correta de linhas comparativas (P0)

**Objetivo:** cards mostram o modo certo conforme estado dos filtros.

**Novo helper** (sugestão: `src/utils/rhMetricDisplay.js`):

```js
export function isCompareMode(compareFilterSets) {
  if (!compareFilterSets || compareFilterSets.length === 0) return false;
  if (compareFilterSets.length > 1) return true;
  return compareFilterSets.some((set) => setHasActiveFilters(set));
}

export function buildMetricRows({ compareResults, compareFilterSets, field, removePercent, generalValue }) {
  const compareMode = isCompareMode(compareFilterSets);

  if (!compareMode) {
    return {
      rows: [
        { label: "Sua Empresa", value: removePercent(compareResults[0]?.[field]), insufficient: compareResults[0]?.lessThanFive },
      ],
      generalValue,
    };
  }

  return {
    rows: compareResults.map((r) => ({
      label: r.label,
      subtitle: summarizeActiveFilters(compareFilterSets.find(...)), // opcional PR-C
      value: removePercent(r[field]),
      insufficient: r.lessThanFive,
    })),
    generalValue,
  };
}
```

| # | Ação | Arquivo |
|---|---|---|
| B1 | Criar helper `isCompareMode` + `buildMetricRows` | `utils/rhMetricDisplay.js` |
| B2 | Passar `compareFilterSets` para `DashBoardRhMetrics` | `DashBoardAnswers.vue` |
| B3 | Substituir `hasCompareRows` / `compareRowsFor` pelo helper | `DashBoardRhMetrics.vue` |
| B4 | Ajustar `UiMetricCard` / `UiStatCard`: aceitar `rows` prontas **ou** manter props atuais mas só preencher `compareRows` quando `isCompareMode` | `UiMetricCard.vue`, `UiStatCard.vue` |

**Regra de exibição final:**

```
compareFilterSets.length === 1 && sem filtros ativos
  → Sua Empresa + Média Geral

compareFilterSets.length === 1 && com filtros
  → Filtro 1 + Média Geral  (ou "Sua Empresa (Operações)")

compareFilterSets.length >= 2
  → Filtro 1 + Filtro 2 [+ Filtro 3] + Média Geral
```

**Critério de aceite:**

- [ ] Sem filtros: cards mostram **Sua Empresa** + **Média Geral**.
- [ ] Filtro 1 = Operações: linha reflete subset (valor ≠ empresa inteira).
- [ ] + Filtro 2 = Tecnologia: **duas linhas distintas** + Média Geral.
- [ ] Valores iguais em dois filtros ainda mostram **duas linhas** (labels diferentes).

---

### PR-C — UX das linhas comparativas (P1)

| # | Ação |
|---|---|
| C1 | Subtítulo opcional por linha: chips do filtro ativo (“Área: Operações”) |
| C2 | Remover prop global `lessThanFive` dos cards; usar só `insufficient` por linha |
| C3 | Destaque visual quando valores entre filtros diferem (cor/borda sutil) |

---

### PR-D — Timeline alinhada (P2)

| # | Ação |
|---|---|
| D1 | `loadMetricTimeline`: só incluir séries de filtros em `isCompareMode` |
| D2 | Com 1 conjunto sem filtro: série única “Sua Empresa” + “Média Geral” |

---

## Ordem sugerida

```
PR-A (crash)  →  PR-B (lógica comparativo)  →  PR-C (UX)  →  PR-D (timeline)
     P0                    P0                      P1              P2
```

**Não misturar** com layout USER (`layout-user-shell-rh`).

---

## Teste manual (seed)

Login: `teste.empresa@prepara.me` / `Teste@123`

| Passo | Esperado |
|---|---|
| 1. Abrir dashboard | 8 cards no grid (e-NPS, Risco, Marca, Realocados, Acolhidos, Pessoas recolocadas, Rescisão, Pendências) |
| 2. Sem filtro | Cada card: **Sua Empresa** + **Média Geral** |
| 3. Filtro 1 → Operações | Valor e-NPS reflete 1 colaborador; linha “Filtro 1” ou “Sua Empresa (Operações)” |
| 4. + Comparar → Filtro 2 → Tecnologia | e-NPS com **2 linhas** diferentes + Média Geral |
| 5. Remover Filtro 2 | Volta ao modo 1 conjunto |
| 6. Clicar card e-NPS | Timeline com séries coerentes com linhas do card |

---

## Arquivos envolvidos

| Arquivo | Papel |
|---|---|
| `DashBoardAnswers.vue` | `compareResults`, `compareFilterSets`, `removePercent`, load API |
| `DashBoardRhMetrics.vue` | Orquestra 8 cards, `compareRowsFor` |
| `UiMetricCard.vue` | Barras de progresso + `displayRows` |
| `UiStatCard.vue` | Cards estatísticos (Acolhidos, Recolocados) |
| `RhMetricCard.vue` / `RhStatCard.vue` | Reexport dos Ui* |
| `utils/rhMetricDisplay.js` | **Novo** — regras de modo comparativo |

---

## Relacionado

- [Filtros Quasar](./2026-06-19-dashboard-rh-filtros-quasar.md) — PR1 concluído
- [Layout USER shell RH](./2026-06-19-layout-user-shell-rh.md) — independente
