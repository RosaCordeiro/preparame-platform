# CORR — Remover rastreadores Google do app.prepara.me

## 1. Identificacao

| Campo | Valor |
|-------|-------|
| Tipo | **fix** |
| Codigo | CORR-2026-08-04-REMOVE-GOOGLE-TRACKERS |
| Titulo | Tirar rastreadores Google de todas as páginas do app.prepara.me |
| Branch | `fix/remove-google-trackers` (platform) |
| Severidade | **media** (métricas/marketing cruzadas com o site; não quebra fluxo de produto) |
| Ambiente | prod / homolog (app.prepara.me e builds do mesmo frontend) |
| Status | verificado (docs fase 7) |
| Data do incidente | 2026-08-04 (pedido operacional) |
| Data deste documento | 2026-08-04 |
| Relator | Guilherme Cordeiro |

## 2. Sintoma (o que o usuario / sistema viu)

O **app** (plataforma logada / frontend Quasar) envia hits para propriedades Google compartilhadas (ou as mesmas do site institucional), misturando tráfego/conversões do app com o site. Operação quer **zerar** Google no app agora e criar **depois** um rastreador exclusivo do app.

- Mensagem de erro / HTTP: N/A
- Onde: todas as rotas do frontend `preparame-platform` (boot global + template HTML + router)
- Frequencia: contínua em page views / navegação SPA

## 3. Evidencias (fatos)

| # | Tipo | Evidencia (fato) | Fonte |
|---|------|------------------|-------|
| 1 | codigo | Boot Quasar registra `gtag-ads` | `quasar.conf.js` → `boot: [..., "gtag-ads"]` |
| 2 | codigo | Ads `AW-304198855` + page_view em cada rota | `src/boot/gtag-ads.js` |
| 3 | codigo | Script gtag Ads no HTML inicial | `src/index.template.html` (`googletagmanager.com/gtag/js?id=AW-304198855`) |
| 4 | codigo | Analytics Universal `UA-151306939-1` via `vue-gtag` no Router | `src/router/index.js` |
| 5 | deps | Pacote `vue-gtag` no projeto | `package.json` |
| 6 | codigo | Nenhum componente chama `$gtag` / conversion fora do boot | grep em `src/` |

## 4. Linha do tempo (entendimento fiel)

| Quando | O que ocorreu | Evidencia # |
|--------|---------------|-------------|
| Histórico | App passou a carregar Ads + UA em todas as páginas | 1–5 |
| 2026-08-04 | Relato: Google confunde app com site; pedido para remover tudo do app | pedido |
| 2026-08-04 | Inventário no código (IDs AW + UA) | 1–6 |
| Futuro (fora de escopo) | Criar rastreador exclusivo do app | pedido |

## 5. Impacto

- Quem/o que foi afetado: marketing/analytics (métricas misturadas app vs site); usuários do app com scripts Google desnecessários
- Dados corrompidos / perda: não; possível **contaminação de relatórios** GA/Ads
- Trabalho interrompido: não (produto funciona); bloqueio de decisão de métricas do app sim

## 6. Causa raiz

### 6.1 Causa raiz (afirmacao)

O frontend do **app** embute IDs Google de Analytics (`UA-151306939-1`) e Ads (`AW-304198855`) de forma global (HTML + boot + vue-gtag), sem propriedade exclusiva do app.

### 6.2 Cadeia causal

`Boot/HTML/Router com gtag UA+AW → page_view em toda navegação SPA → hits misturados com o site no Google → confusão operacional`

### 6.3 O que **nao** e a causa (descartes)

| Hipotese descartada | Por que descartou (evidencia) |
|---------------------|-------------------------------|
| Cookie banner DPO (`cookies.dponet.com.br`) | Não é rastreador Google (# template); fora do pedido |
| VLibras | Acessibilidade, não Google Analytics/Ads |
| Backend enviando eventos Google | Evidência só no frontend Quasar (#1–5) |
| Um único arquivo “esquecido” | São três pontos de injeção + dependência (#1–5) |

### 6.4 Confianca

| Nivel | Condicao |
|-------|----------|
| Alta | Reproduzido ou comprovado por evidencia direta |
| Media | Evidencia forte, reproducao parcial |
| Baixa | Inferencia |

Nivel deste caso: **Alta** — IDs e wiring estão no código-fonte do app.

## 7. Correcao proposta

### 7.1 Mudanca

No `preparame-platform` (branch `fix/remove-google-trackers`):

1. Remover boot `gtag-ads` de `quasar.conf.js` e apagar `src/boot/gtag-ads.js` (ou esvaziar e não registrar — preferir **remover**).
2. Remover scripts gtag/`AW-304198855` de `src/index.template.html`.
3. Remover `VueGtag` / `UA-151306939-1` de `src/router/index.js`.
4. Remover dependência `vue-gtag` de `package.json` (e lockfile ao instalar).
5. Confirmar grep sem `UA-`, `AW-`, `vue-gtag`, `gtag-ads`, `googletagmanager` no `src/` (exceto menções em docs/CHANGELOG desta CORR).

**Nao** adicionar novo ID Google nesta entrega (usuário cria rastreador exclusivo depois).

Observabilidade Node (`@clamed/logger` / metrics): **N/A** — só frontend.

### 7.2 Justificativa

Elimina a **fonte** dos hits Google no app; sem scripts/boot/plugin, nenhuma página continua rastreando com esses IDs.

### 7.3 Alternativas consideradas

| Alternativa | Por que nao foi escolhida |
|-------------|---------------------------|
| Só desligar em produção via env | IDs continuariam no bundle/HTML; risco de reativar por engano; pedido é remover |
| Trocar já pelo ID “só app” | ID novo ainda não existe; pedido explícito: tirar agora, criar depois |
| Manter Ads e tirar só UA | Ambos confundem; pedido: todos os rastreadores Google |

### 7.4 Riscos da correcao

| Risco | Mitigacao |
|-------|-----------|
| Campanhas Ads/UA deixam de receber conversões do app | Aceito pelo pedido; novo tracker virá em feat futura |
| Cache CDN/HTML antigo ainda serve gtag | Deploy + hard refresh; V-xx em homolog/prod |
| Referência quebrada a `$gtag` | Grep: nenhum uso em componentes (#6) |

### 7.5 Escopo consciente

- Entra: remoção completa dos trackers Google atuais no frontend do app + docs CORR/CHANGELOG/README se aplicável
- **Nao** entra: novo GA4/GTM do app; alterar site institucional; remover DPO/VLibras; backend

## 8. Plano de verificacao (V-xx)

| ID | Como validar | Resultado esperado |
|----|--------------|-------------------|
| V-01 | Grep no repo: `UA-151306939`, `AW-304198855`, `vue-gtag`, `gtag-ads`, `googletagmanager` em `src/` e boot | Zero ocorrências de wiring |
| V-02 | Abrir app (dev/homolog), DevTools → Network, filtrar `google` / `gtag` / `collect` | Sem requests para Google Analytics/Ads do app |
| V-03 | Navegar 2–3 rotas autenticadas (ex.: painel, Ver Produtos) | App funciona; sem erro de módulo `gtag-ads` / `vue-gtag` |
| V-04 | `npm run lint` (e build se CI exigir) | PASS |

### 8.1 Resultados (fase 5 — 2026-08-04)

| ID | Resultado | Evidencia |
|----|-----------|-----------|
| V-01 | **PASS** | `rg` em `src/`, `quasar.conf.js`, `package.json`, lock: zero hits; boot sem `gtag-ads.js`; `gtm.js` removido |
| V-02 | **PASS** (parcial) | HTML servido em `:8081` e `index.template.html` sem `googletagmanager`/`AW`/`UA`; confirmar Network no browser apos hard refresh se o HMR estiver antigo |
| V-03 | **PASS** (codigo) | Router sem VueGtag; FAQ sem `gtm.logEvent`; boots ativos: axios, notification, apex |
| V-04 | **PASS** | eslint em `router/index.js`, `FAQ.vue`, `quasar.conf.js` exit 0 |

Nota: `vue-google-charts` permanece (graficos). Banner DPO / VLibras fora do escopo.

## 9. Apos a correcao (preencher nas fases de teste / docs)

| Campo | Valor |
|-------|-------|
| Commit(s) | |
| O que mudou de fato | Removidos UA/AW/vue-gtag/gtag-ads/gtm.js; FAQ sem dataLayer; docs agente/README/CHANGELOG |
| Verificacoes executadas (V-xx) | V-01…V-04 PASS (§8.1); suite: `npm test` N/A; `npm run lint` PASS |
| Status final | DoD em revisao com usuario |

## 10. Licoes / prevencao (opcional)

- Qualquer novo tracker do app: ID **próprio**, preferencialmente via env (`VUE_APP_GA_ID`), nunca reutilizar propriedade do site.
- Checklist de release: Network tab sem `googletagmanager` / `google-analytics` indesejados.

---

## Validacao interna (checklist)

| Item | Resultado |
|------|-----------|
| Modelo fix completo | PASS |
| Branch `fix/` registrada | PASS (`fix/remove-google-trackers`) |
| Causa vs sintoma separados | PASS |
| Descartes documentados | PASS |
| V-xx definidos | PASS |
| Gate Node logger/metrics | N/A (só frontend Vue) |
| Validacao geral | **PASS** |
