# SPEC — Perguntas qualitativas apenas para Admin da plataforma

## 1. Identificacao do documento

| Campo | Valor |
|-------|-------|
| Tipo | **feat** |
| Titulo | Restringir cadastro de perguntas qualitativas ao Admin da plataforma |
| Codigo / versao | SPEC-2026-07-18-perguntas-qualitativas / v0.1 |
| Branch | `feat/perguntas-qualitativas-so-admin` (platform + backend) |
| Objetivo (1-2 frases) | Remover o cadastro/gestão de perguntas qualitativas das telas do COMPANY_ADMIN; apenas o ADMIN da plataforma poderá cadastrar e gerir essas perguntas. |
| Solicitante / stakeholders | Produto Prepara.me |
| Atores / personas | ADMIN (plataforma), COMPANY_ADMIN (RH empresa), ex-colaborador (responde pesquisa — sem mudança de fluxo de resposta) |
| Prioridade | MVP |
| Status | verificado |
| Data | 2026-07-18 |

## 2. Contexto e problema (BRD)

- **Situacao atual:** o menu e as rotas de **Perguntas Qualitativas** (`/surveyQuestions`, `/surveyQuestions/new`, `/surveyQuestions/:id`) estão liberados apenas para `COMPANY_ADMIN`. O perfil `ADMIN` da plataforma **não** tem o item no menu. No backend, endpoints `POST/GET/PUT/DELETE /companies/surveyquestions` estão pouco protegidos (create/list/update sem `ensureAdmin`; delete só com autenticação).
- **Dor / oportunidade:** o RH da empresa não deve configurar as perguntas qualitativas; a responsabilidade passa a ser exclusiva do admin da plataforma.
- **Por que agora:** alinhamento de governança do conteúdo da pesquisa pós-demissão.
- **Restricoes:** manter o comportamento da pesquisa para o ex-colaborador (etapa de perguntas da empresa) inalterado; perguntas já existentes continuam válidas.

## 3. Objetivos e metrica de sucesso

| Objetivo | Como medir (negocio) |
|----------|----------------------|
| COMPANY_ADMIN não acessa mais cadastro/gestão de perguntas qualitativas | Menu sem item; rotas bloqueadas; tentativa de URL direta redireciona/nega |
| Somente ADMIN cadastra/edita/exclui/lista perguntas | Menu Admin com acesso; CRUD funcional com seleção de empresa |
| API não aceita escrita de não-admin | Chamadas sem perfil ADMIN retornam 401/403 |

## 4. Escopo

### 4.1 Em escopo

- Remover item **Perguntas Qualitativas** do menu `COMPANY_ADMIN`.
- Remover/bloquear rotas de frontend `/surveyQuestions*` para `COMPANY_ADMIN`.
- Expor o mesmo CRUD (listagem + cadastro/edição/exclusão) para `ADMIN`.
- Ajustar UX do CRUD para Admin: selecionar **empresa** (não usar `localStorage.companyId` do RH).
- Proteger endpoints de escrita (e, no MVP, gestão) de survey questions no backend para `ADMIN`.
- Atualizar documentação de produto que descreve o RH criando perguntas qualitativas.

### 4.2 Fora de escopo

- Alterar formulário/fluxo de resposta da pesquisa pós-demissão (ex-colaborador / especialista proxy).
- Migrar ou apagar perguntas já cadastradas.
- Relatórios NPS / dashboard RH (apenas leitura das respostas).
- `@clamed/logger` / `light-node-metrics` (ver premissa abaixo — decisão pendente do gate).

### 4.3 Premissas e dependencias

- Premissas:
  - **A-01:** “Admin” = perfil `ADMIN` da plataforma (não `COMPANY_ADMIN`).
  - **A-02 (confirmado):** COMPANY_ADMIN perde o acesso **completo** (listar, criar, editar, excluir) — menu, rotas UI e gestão via API.
  - **A-03:** Admin gerencia perguntas **por empresa** (precisa escolher a empresa no filtro/cadastro).
- Dependencias externas: nenhuma.
- **Gate Node.js (observabilidade):** **Nao — nenhum neste MVP** (confirmado). Pacotes `@clamed/logger` / `light-node-metrics` fora de escopo.

## 5. Glossario

| Termo | Definicao de negocio |
|-------|----------------------|
| Perguntas qualitativas | Perguntas em texto livre configuradas por empresa e exibidas na etapa 3 da pesquisa pós-demissão |
| Admin da plataforma | Usuário com perfil `ADMIN` |
| Company admin / RH | Usuário com perfil `COMPANY_ADMIN`, gestor da empresa parceira |
| Cadastro | Criar, editar e excluir perguntas (gestão completa do CRUD) |

## 6. Regras de negocio (RN)

| ID | Regra | Obrigatoria? |
|----|-------|--------------|
| RN-01 | Apenas o Admin da plataforma pode criar, editar e excluir perguntas qualitativas de qualquer empresa. | Sim |
| RN-02 | O COMPANY_ADMIN não pode acessar telas nem ações de gestão de perguntas qualitativas. | Sim |
| RN-03 | Toda pergunta qualitativa pertence a exatamente uma empresa (`companyId` obrigatório). | Sim |
| RN-04 | Perguntas já existentes continuam válidas na pesquisa do colaborador, independentemente de quem as cadastrou. | Sim |
| RN-05 | O Admin deve informar/selecionar a empresa ao listar e ao cadastrar perguntas. | Sim |

## 7. Requisitos funcionais (RF / FRD)

| ID | Requisito | Prioridade (MoSCoW) | RNs relacionados |
|----|-----------|---------------------|------------------|
| RF-01 | O sistema deve remover o item de menu “Perguntas Qualitativas” do COMPANY_ADMIN. | Must | RN-02 |
| RF-02 | O sistema deve negar acesso às rotas `/surveyQuestions*` para COMPANY_ADMIN (e demais perfis que não sejam ADMIN). | Must | RN-02 |
| RF-03 | O sistema deve exibir “Perguntas Qualitativas” no menu do ADMIN (grupo Cadastros ou equivalente). | Must | RN-01 |
| RF-04 | O sistema deve permitir ao ADMIN listar, criar, editar e excluir perguntas, com seleção/filtro de empresa. | Must | RN-01, RN-03, RN-05 |
| RF-05 | A API deve exigir autenticação + perfil ADMIN para criar, atualizar, excluir e obter por id (edição) perguntas qualitativas. | Must | RN-01, RN-02 |
| RF-06 | A API deve rejeitar tentativas de escrita (POST/PUT/DELETE) e GET by id por COMPANY_ADMIN (ou token sem ADMIN) com erro de autorização. GET list por `companyId` permanece autenticado para consumo da pesquisa (NPSSurvey). | Must | RN-02, RN-04 |
| RF-07 | Documentação de produto (jornada RH / painel empresa) deve deixar de instruir o RH a cadastrar perguntas e indicar o Admin. | Should | RN-01, RN-02 |

## 8. Requisitos nao funcionais (RNF)

| ID | Categoria | Requisito | Criterio / metrica |
|----|-----------|-----------|--------------------|
| RNF-01 | Seguranca | Autorização no backend, não só no frontend | Endpoints de escrita com middleware de admin; teste manual/automatizado retorna 403/401 sem ADMIN |
| RNF-02 | Usabilidade | Admin consegue escolher empresa sem confusão | Campo/select de empresa visível na listagem e no cadastro |
| RNF-03 | Compatibilidade | Resposta da pesquisa inalterada | Etapa de perguntas da empresa continua carregando por `companyId` |

## 9. User stories e criterios de aceite (Gherkin)

### US-01 — Admin gerencia perguntas

**Como** Admin da plataforma, **quero** cadastrar e gerir perguntas qualitativas por empresa, **para** controlar o conteúdo da pesquisa sem depender do RH.

| ID | Criterio (Given / When / Then) | RFs / RNs |
|----|--------------------------------|-----------|
| CA-01 | **Dado** um usuário ADMIN autenticado **Quando** acessa o menu Cadastros **Entao** vê “Perguntas Qualitativas” | RF-03, RN-01 |
| CA-02 | **Dado** ADMIN na listagem **Quando** filtra/seleciona uma empresa **Entao** vê apenas perguntas daquela empresa | RF-04, RN-05 |
| CA-03 | **Dado** ADMIN no cadastro **Quando** informa empresa + texto e salva **Entao** a pergunta é criada vinculada à empresa | RF-04, RN-03 |

### US-02 — RH sem acesso ao cadastro

**Como** COMPANY_ADMIN, **quero** não ter acesso ao cadastro de perguntas qualitativas, **para** que a configuração fique centralizada no Admin.

| ID | Criterio (Given / When / Then) | RFs / RNs |
|----|--------------------------------|-----------|
| CA-04 | **Dado** COMPANY_ADMIN autenticado **Quando** abre o menu lateral **Entao** não existe item “Perguntas Qualitativas” | RF-01, RN-02 |
| CA-05 | **Dado** COMPANY_ADMIN **Quando** navega diretamente para `/surveyQuestions` **Entao** o acesso é negado/redirecionado | RF-02, RN-02 |
| CA-06 | **Dado** token de COMPANY_ADMIN **Quando** chama `POST /companies/surveyquestions` **Entao** recebe 401/403 | RF-05, RF-06, RN-01 |

### US-03 — Pesquisa do colaborador inalterada

**Como** ex-colaborador, **quero** continuar respondendo as perguntas qualitativas da minha empresa, **para** completar a pesquisa.

| ID | Criterio (Given / When / Then) | RFs / RNs |
|----|--------------------------------|-----------|
| CA-07 | **Dado** empresa com perguntas cadastradas **Quando** o colaborador chega na etapa qualitativa **Entao** as perguntas aparecem normalmente | RN-04, RNF-03 |

## 10. Fluxos / casos de uso principais

### Fluxo: Admin cadastra pergunta (UC-01)

- **Ator primario:** ADMIN
- **Pre-condicoes:** Admin autenticado; empresa existe
- **Fluxo basico (passos):**
  1. Acessa menu → Perguntas Qualitativas
  2. Seleciona/filtra empresa
  3. Cria nova pergunta com texto
  4. Sistema persiste com `companyId`
- **Fluxos alternativos:** editar texto; excluir pergunta
- **Fluxos de excecao:** empresa não selecionada → erro de validação; sem permissão → 403
- **Pos-condicoes:** pergunta disponível na pesquisa da empresa

### Fluxo: COMPANY_ADMIN tenta acessar (UC-02)

- **Ator primario:** COMPANY_ADMIN
- **Pre-condicoes:** autenticado como RH
- **Fluxo basico:** abre menu → item inexistente
- **Fluxos de excecao:** URL direta → bloqueio de rota; API → 403
- **Pos-condicoes:** nenhuma alteração em perguntas

## 11. Excecoes e erros de negocio

| Situacao | Comportamento esperado | Mensagem / codigo (se houver) |
|----------|------------------------|-------------------------------|
| COMPANY_ADMIN acessa rota de UI | Bloqueio / redirect conforme padrão de `userTypes` do router | N/A (padrão plataforma) |
| Não-ADMIN chama API de escrita | Rejeitar | 401/403 |
| ADMIN salva sem empresa ou sem texto | Não persiste; feedback de validação | Mensagem de campo obrigatório |
| Empresa inexistente no create | Erro de negocio/validação | 400/404 conforme padrão API |

## 12. Dados de negocio

| Entidade | Atributos criticos | Regras / validade |
|----------|--------------------|-------------------|
| SurveyQuestion | id, companyId, questionText | companyId e questionText obrigatórios; texto não vazio |

## 13. Integracoes (se houver)

N/A — sem integração externa nova; uso das APIs internas `/companies/surveyquestions`.

## 14. Rastreabilidade (minima)

| User story | RFs | RNs | Criterios de aceite |
|------------|-----|-----|---------------------|
| US-01 | RF-03, RF-04 | RN-01, RN-03, RN-05 | CA-01, CA-02, CA-03 |
| US-02 | RF-01, RF-02, RF-05, RF-06 | RN-01, RN-02 | CA-04, CA-05, CA-06 |
| US-03 | — | RN-04 | CA-07 |

## 15. Cenarios de validacao de regra de negocio (fase dedicada pos-review)

| ID | Cenario | Entrada | Resultado esperado | RN/RF | Resultado (2026-07-18) |
|----|---------|---------|--------------------|-------|------------------------|
| VAL-01 | COMPANY_ADMIN abre menu | Login RH | Sem item Perguntas Qualitativas | RN-02, RF-01 | **Passou** (estático): item só em `ADMIN`; ausente em `COMPANY_ADMIN` (`menuConfig.js`) |
| VAL-02 | COMPANY_ADMIN URL `/surveyQuestions` | Navegação direta | Acesso negado | RN-02, RF-02 | **Passou** (estático): 3 rotas com `userTypes: ['ADMIN']` |
| VAL-03 | ADMIN cria pergunta para empresa X | Texto + companyId X | Persistido e listável | RN-01, RN-03, RF-04 | **Passou** (runtime Docker): POST 201 + GET list contém a pergunta (`Empresa Demo`) |
| VAL-04 | COMPANY_ADMIN POST surveyquestions | Token RH + body válido | 401/403 | RN-01, RF-06 | **Passou** (runtime): rejeitado com `"User is not admin"` (HTTP **400** via `AppError` padrão — equivalente funcional a 403) |
| VAL-05 | Colaborador responde pesquisa | Empresa com perguntas | Etapa qualitativa exibe perguntas | RN-04 | **Passou** (estático): `NPSSurvey` segue chamando `GET companies/surveyquestions`; GET list só exige auth (sem `ensureAdmin`) |

**Ambiente runtime:** Docker Compose (`database_preparame` + `preparame_app`) em 2026-07-18 — API `http://localhost:3334`.

### Suite automatizada (2026-07-19)

```bash
npx jest --runInBand --collectCoverage=false --testPathPattern='company/useCases/(listCompany|createCompany|listCompanyEmployee|createCompanyEmployee)|getSurveyQuestionUseCase'
```

**Resultado:** passou (inclui `getSurveyQuestionUseCase` da feat + regressão company/employee com in-memory alinhado).

## 16. Assumptions e perguntas abertas

| ID | Tipo (assumption / pergunta) | Texto | Impacto se errado |
|----|------------------------------|-------|-------------------|
| A-01 | assumption | “Admin” = `ADMIN` plataforma | Alto |
| A-02 | assumption (confirmada) | COMPANY_ADMIN perde **todo** o acesso (lista+CRUD+menu+rotas). | Alto |
| A-03 | assumption | Admin precisa selecionar empresa no CRUD | Alto |
| Q-01 | assumption (confirmada) | Gate Node: **Não** incluir `@clamed/logger` nem `light-node-metrics` neste MVP. | Medio |
| Q-02 | assumption (refinada no design) | GET list autenticado (consumo pesquisa); escrita + GET `:id` só ADMIN. | Medio |

## 17. Historico de revisao

| Versao | Data | Autor | Mudanca |
|--------|------|-------|---------|
| 0.1 | 2026-07-18 | Agent Pro | Rascunho inicial |
| 0.2 | 2026-07-18 | Agent Pro | Confirmado: remover tudo do RH; sem logger/metrics Clamed |
| 0.3 | 2026-07-18 | Agent Pro | Status aprovado; design refine RF-05/06: GET list autenticado (NPSSurvey), escrita+GET :id só ADMIN |
| 0.4 | 2026-07-18 | Agent Pro | Resultados VAL-01…05 (estático; VAL-03/04 bloqueados sem API local) |
| 0.5 | 2026-07-18 | Agent Pro | VAL-03/04 runtime Docker ok; suite Jest getSurveyQuestionUseCase (2 passed); FE sem testes |
| 0.6 | 2026-07-19 | Agent Pro | Suite company/employee + getSurveyQuestion passou; status verificado; docs ops Compose |
