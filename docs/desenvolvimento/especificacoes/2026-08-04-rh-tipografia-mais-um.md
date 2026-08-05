# SPEC — Tipografia +1 nos painéis RH

## 1. Identificacao do documento

| Campo | Valor |
|-------|-------|
| Tipo | **feat** |
| Titulo | Subir um nível as fontes dos painéis RH |
| Codigo / versao | SPEC-2026-08-04-RH-TIPOGRAFIA / v0.1 |
| Branch | `feat/rh-tipografia-mais-um` |
| Objetivo | Deixar textos dos painéis do COMPANY_ADMIN um pouco maiores (+1 nível tipográfico), sem redesign |
| Solicitante / stakeholders | Guilherme Cordeiro / RH Prepara.me |
| Atores / personas | COMPANY_ADMIN (RH) |
| Prioridade | MVP |
| Status | verificado (docs fase 7) |
| Data | 2026-08-04 |

Observabilidade Node (`@clamed/logger` / `light-node-metrics`): **N/A** — só frontend Vue/CSS.

## 2. Contexto e problema (BRD)

- **Situacao atual:** tipografia dos painéis RH (Painel, Indicadores quantitativa/qualitativa, OTW, shell RH) usa `rem` sobre o `html` padrão (~16px). Visualmente os textos estão pequenos.
- **Dor:** leitura cansativa nos dashboards e menus do RH.
- **Por que agora:** pedido operacional após entregas recentes de UX RH.
- **Restricoes:** não redesenhar layout; não afetar site público (`html.site-body` 62.5%); preferir escopo **só RH** (não especialista/admin genérico, salvo decisão contrária).

## 3. Objetivos e metrica de sucesso

| Objetivo | Como medir |
|----------|------------|
| Textos do shell/painéis RH um nível maiores | Inspeção visual: título, cards, filtros, menu lateral |
| Sem regressão em USER/SPECIALIST/ADMIN (não-RH) | Layouts sem classe RH mantêm tamanho atual |
| Sem quebrar grids/overflows graves | Smoke nas rotas RH principais |

## 4. Escopo

### 4.1 Em escopo

- Escala tipográfica global **apenas** quando o layout Platform estiver no modo RH (`COMPANY_ADMIN` / `platform--rh`).
- Mecanismo: classe no `html` (ex.: `app-rh`) + `font-size: 18px` (mesmo padrão do WIP tipografia +1 em `e9e200d`, restrito ao RH).
- Docs curtos (SPEC + CHANGELOG/README na fase docs).

### 4.2 Fora de escopo

- Site institucional / páginas `site-body`.
- Perfis USER, SPECIALIST, ADMIN (menu clássico).
- Redesign de cards, cores, espaçamentos além do efeito colateral do rem.
- Novo design system completo / tokens de tipo.
- Backend.

### 4.3 Premissas

- Componentes RH usam majoritariamente `rem` → subir a base do `html` escala títulos, labels, métricas e shell juntos.
- Valores em `px` fixos (poucos) **não** sobem; aceitável no MVP.

## 5. Personas e user stories

| ID | Como | Quero | Para |
|----|------|-------|------|
| US-01 | RH | ver textos um pouco maiores nos painéis | ler KPIs e filtros com menos esforço |

## 6. Requisitos funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | Com `userType === COMPANY_ADMIN`, tipografia do app logado RH deve usar base `html` ~18px | MVP |
| RF-02 | Ao sair do layout Platform RH, a classe deve ser removida do `html` | MVP |
| RF-03 | Outros perfis não devem receber a classe / bump | MVP |

## 7. Regras de negocio

| ID | Regra |
|----|-------|
| RN-01 | O bump aplica-se só ao contexto RH (COMPANY_ADMIN no layout Platform). |
| RN-02 | Não alterar `html.site-body` (62.5% do site). |

## 8. Criterios de aceite (CA)

| ID | Criterio |
|----|----------|
| CA-01 | Login RH → menu/painéis visualmente maiores que antes (comparável a +1 nível). |
| CA-02 | Login especialista/admin clássico → tipografia inalterada. |
| CA-03 | Logout / sair do Platform → sem classe `app-rh` residual no `html`. |

## 9. Cenarios VAL (Gherkin)

```gherkin
Scenario: VAL-01 RH vê tipografia maior
  Given usuário COMPANY_ADMIN no layout Platform
  When abre Painel ou Indicadores
  Then html possui classe app-rh e textos rem estão ~12.5% maiores (16→18px)

Scenario: VAL-02 Especialista sem bump
  Given usuário SPECIALIST no layout Platform
  When navega no app
  Then html não possui app-rh

Scenario: VAL-03 Limpeza ao destruir layout
  Given COMPANY_ADMIN com app-rh ativo
  When o layout Platform é destruído (logout/navegação fora)
  Then a classe app-rh é removida do html
```

### 9.1 Resultados (fase 5 — 2026-08-04)

| ID | Resultado | Evidencia |
|----|-----------|-----------|
| VAL-01 | **PASS** | Código: `app-rh` + `18px` só se `isCompanyAdmin`; validação visual do solicitante (“ficou bom”) |
| VAL-02 | **PASS** (codigo) | `mounted` só adiciona classe com `COMPANY_ADMIN`; SPECIALIST/ADMIN não entram no branch |
| VAL-03 | **PASS** (codigo) | `beforeDestroy` remove `app-rh` incondicionalmente |

CA-01…03 cobertos pelos VAL acima. Site `html.site-body` intocado (RN-02).

Suite automatizada (fase 6): `npm test` N/A placeholder exit 0; `npm run lint` PASS. Backend N/A.

## 10. Nao-funcionais

- Sem impacto em API; só CSS/classe no layout.
- Preferir uma regra CSS central (não editar dezenas de `font-size` à mão).

## 11. Dependencias e riscos

| Risco | Mitigacao |
|-------|-----------|
| Overflow em cards estreitos | Smoke visual; ajustar só se crítico |
| px fixos não escalam | Aceito no MVP; listar se notar |

## 12. Perguntas abertas

Nenhuma bloqueante — confirmar na aprovação se o bump deve ser **só RH** (proposta) ou **toda área logada**.
