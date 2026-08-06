# SPEC — Boas-vindas com primeiro nome

## 1. Identificacao do documento

| Campo | Valor |
|-------|-------|
| Tipo | **feat** |
| Titulo | Mensagem de boas-vindas usa apenas o primeiro nome |
| Codigo / versao | SPEC-2026-08-05-BOAS-VINDAS-PRIMEIRO-NOME / v0.1 |
| Branch | `feat/boas-vindas-primeiro-nome` |
| Objetivo | Exibir só o primeiro nome nas saudações pós-login (não o nome completo) |
| Solicitante | Guilherme Cordeiro |
| Atores | COMPANY_ADMIN (RH), USER (ex-colaborador) — quem vê “Olá, …” |
| Prioridade | MVP |
| Status | verificado (docs fase 7) |
| Data | 2026-08-05 |

Observabilidade Node (`@clamed/logger` / metrics): **N/A** — só frontend Vue.

## 2. Contexto e problema (BRD)

- **Situacao atual:** a saudação usa `userName` completo do `localStorage` (ex.: “Olá, Camila Mendes Borba!”).
- **Dor:** mensagem longa/pesada; pedido de usar só o nome inicial.
- **Onde aparece hoje:**
  - RH: `RhSideNavMenuPanel.vue` — `Olá, {{ userName }}!`
  - Ex-colaborador: `ExternalUserWelcomeCard.vue` e `ExternalUserWelcomeCardMobile.vue` — `Olá, {{ userName }}, …`
- **Toolbar** (`RhToolbar` / menus): mostra nome na conta — **não** é saudação “Olá”; permanece nome completo no MVP (identidade).

## 3. Objetivos e metrica de sucesso

| Objetivo | Como medir |
|----------|------------|
| Saudação com primeiro token do nome | Visual / VAL |
| Nome vazio ou só espaços → fallback “Usuário” | VAL |

## 4. Escopo

### 4.1 Em escopo

- Extrair primeiro nome (split por espaços, trim) nas 3 telas de saudação acima.
- Preferir util compartilhado (ex.: `src/utils/firstName.js`) para não duplicar regra.
- SPEC + docs na fase docs.

### 4.2 Fora de escopo

- Alterar `localStorage.userName` (continua nome completo).
- Renomear labels da toolbar / dropdown de conta.
- Backend / API.
- Tratamento especial de partículas (“de”, “da”) — MVP = primeiro token.

### 4.3 Premissas

- `userName` no storage é o nome completo em português (espaços como separador).

## 5. User stories

| ID | Como | Quero | Para |
|----|------|-------|------|
| US-01 | RH | ver “Olá, Camila!” | saudação mais curta |
| US-02 | Ex-colaborador | ver “Olá, João, …” no card de boas-vindas | idem |

## 6. Requisitos funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | Saudação RH (sidebar) usa primeiro nome | MVP |
| RF-02 | Cards de boas-vindas USER (desktop + mobile) usam primeiro nome | MVP |
| RF-03 | Função única `firstNameFromFullName(full)` | MVP |
| RF-04 | Se nome inválido/vazio → `"Usuário"` | MVP |

## 7. Regras de negocio

| ID | Regra |
|----|-------|
| RN-01 | Primeiro nome = primeiro segmento após `trim` e `split(/\s+/)` |
| RN-02 | Não alterar o valor persistido em `localStorage.userName` |

## 8. Criterios de aceite

| ID | Criterio |
|----|----------|
| CA-01 | Nome “Camila Mendes Borba” → saudação mostra “Camila” |
| CA-02 | Nome “João” → mostra “João” |
| CA-03 | Nome vazio / null → “Usuário” |
| CA-04 | Toolbar RH ainda pode mostrar nome completo |

## 9. Cenarios VAL

```gherkin
Scenario: VAL-01 RH primeiro nome
  Given COMPANY_ADMIN com userName "Camila Mendes Borba"
  When abre o menu lateral RH
  Then a saudação exibe "Olá," e "Camila!"

Scenario: VAL-02 USER card
  Given USER com userName "Lucas Michael Silva"
  When abre o HomeUser
  Then o card de boas-vindas contém "Olá, Lucas,"

Scenario: VAL-03 fallback
  Given userName vazio
  When a saudação renderiza
  Then exibe "Usuário"
```

### 9.1 Resultados (fase 5 — 2026-08-05)

| ID | Resultado | Evidencia |
|----|-----------|-----------|
| VAL-01 | **PASS** | Util → “Camila”; UI RH com `firstName`; validação do solicitante (“mensagem de bem vindo deu certo”) |
| VAL-02 | **PASS** | Util → “Lucas”; cards USER usam `firstName` |
| VAL-03 | **PASS** | Util fallback “Usuário” para vazio/null |

CA-01…03 cobertos; CA-04 (toolbar completo) sem alteração de código — OK.

Suite automatizada (fase 6): `npm test` N/A placeholder exit 0; `npm run lint` PASS. Backend N/A.

## 10. Nao-funcionais

- Sem dependência de backend; lint ok.

## 11. Riscos

| Risco | Mitigacao |
|-------|-----------|
| Nomes compostos desejados (“Ana Clara”) | MVP conscientemente usa 1º token; revisar depois se pedido |
| Duplicação da regra | Util compartilhado |

## 12. Perguntas abertas

Nenhuma bloqueante — toolbar fora do escopo (só saudações “Olá”).
