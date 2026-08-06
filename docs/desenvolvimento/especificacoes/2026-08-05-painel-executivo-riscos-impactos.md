# SPEC — Painel Executivo de Riscos e Impactos

## 1. Identificacao do documento

| Campo | Valor |
|-------|-------|
| Tipo | **feat** |
| Titulo | Renomear painel RH para Painel Executivo de Riscos e Impactos |
| Codigo / versao | SPEC-2026-08-05-PAINEL-EXECUTIVO-RISCOS-IMPACTOS / v0.1 |
| Branch | `feat/painel-executivo-riscos-impactos` |
| Objetivo | Trocar o nome exibido do painel `/platform` (menu + título) para **Painel Executivo de Riscos e Impactos** |
| Solicitante | Guilherme Cordeiro |
| Atores | COMPANY_ADMIN (RH) |
| Prioridade | MVP |
| Status | aprovado (pedido explícito do solicitante) |
| Data | 2026-08-05 |

Observabilidade Node (`@clamed/logger` / metrics): **N/A** — só frontend Vue (rótulos).

## 2. Contexto e problema (BRD)

- **Situacao atual:** o item de menu e o título da página usam **Painel de riscos e impactos**.
- **Dor / oportunidade:** alinhar naming ao posicionamento “Painel Executivo”.
- **Por que agora:** pedido do produto após merge de tipografia/boas-vindas.

## 3. Objetivos e metrica de sucesso

| Objetivo | Como medir |
|----------|------------|
| Nome único e consistente no shell RH | Menu + título da página `/platform` iguais ao texto alvo |
| Docs vivas alinhadas | README + mapa/jornada/painel RH |

## 4. Escopo

### 4.1 Em escopo

- Label do menu COMPANY_ADMIN (`menuConfig.js`).
- Título da página quando `rhSection === "metrics"` (`DashBoardAnswers.vue` → `rhPageTitle`).
- Docs de produto e README/CHANGELOG.

### 4.2 Fora de escopo

- Mudança de rota (`/platform` permanece).
- Layout, cards, KPIs, tipografia.
- Reescrita de SPECs históricas (jul/2026) — permanecem como registro.

### 4.3 Premissas

- Texto exato: **Painel Executivo de Riscos e Impactos** (maiúsculas conforme pedido).
- Subtítulo da página (`rhPageSubtitle`) permanece neste MVP.

## 5. Glossario

| Termo | Definicao |
|-------|-----------|
| Painel Executivo de Riscos e Impactos | Nome do item de menu e título da home RH em `/platform` |

## 6. Regras de negocio (RN)

| ID | Regra | Obrigatoria? |
|----|-------|--------------|
| RN-01 | O rótulo do menu do painel RH deve ser exatamente “Painel Executivo de Riscos e Impactos”. | Sim |
| RN-02 | O título da página `/platform` (seção metrics) deve ser o mesmo texto do menu. | Sim |

## 7. Requisitos funcionais (RF)

| ID | Requisito | Prioridade | RNs |
|----|-----------|------------|-----|
| RF-01 | Menu lateral RH exibe o novo nome. | Must | RN-01 |
| RF-02 | Header da página `/platform` exibe o novo nome. | Must | RN-02 |

## 8. Requisitos nao funcionais (RNF)

| ID | Requisito | Criterio |
|----|-----------|----------|
| RNF-01 | Sem regressão de rota/navegação | Clique no item continua indo para `/platform` |

## 9. Criterios de aceite / VAL

| ID | Criterio |
|----|----------|
| CA-01 / VAL-01 | COMPANY_ADMIN vê no menu **Painel Executivo de Riscos e Impactos** |
| CA-02 / VAL-02 | Em `/platform`, o título da página é **Painel Executivo de Riscos e Impactos** |

```gherkin
Scenario: VAL-01 menu
  Given COMPANY_ADMIN autenticado
  When abre o menu lateral RH
  Then o item do painel lê "Painel Executivo de Riscos e Impactos"

Scenario: VAL-02 titulo
  Given COMPANY_ADMIN autenticado
  When navega para /platform
  Then o título da página é "Painel Executivo de Riscos e Impactos"
```

## 10. Fora de escopo / assumptions

- A-01: Capitalização “Executivo” / “Riscos” / “Impactos” conforme pedido do solicitante.
- SPECs antigas que citam o nome anterior não são atualizadas neste feat.
