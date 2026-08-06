# Mapa da plataforma

## Para quem é

Referência rápida de todas as páginas e áreas disponíveis na plataforma.

## O que é

Um inventário completo das seções, páginas e funcionalidades visíveis ao usuário — site público e plataforma logada.

---

## Site público

| Página | Caminho | Descrição |
|---|---|---|
| Página inicial | `/` | Home com proposta B2B/B2C, estatísticas e soluções |
| Clientes | `/clientes` | Cases e empresas parceiras |
| Treinamento | `/treinamento` | Oferta de capacitação para empresas |
| Materiais gratuitos | `/MateriaisGratuitos` | Conteúdos educativos para download |
| Material específico | `/MateriaisGratuitos/:nome` | Página de um material individual |
| Mentorias — catálogo | `/ProductList` | Lista de mentorias e serviços disponíveis |
| Mentorias — detalhe | `/ProductDetails` | Descrição e preço de um serviço |
| Mentorias — agendamento | `/ProductSchedule` | Escolha de horário (quando aplicável) |
| Carrinho de compras | `/ShoppingCart` | Revisão e pagamento |
| Kit Recolocação Pro | `/KitRecolocacao` | Pacote B2C com simulador e modelo de CV |
| Demissão responsável | `/demissaohumanizada` | Landing page B2B do programa |
| Patrocínio empresarial | `/patrocinio/:empresa` | Página personalizada da empresa parceira |
| Nossa empresa | `/CompanyDetails` | História e missão da Prepara.me |
| FAQ | `/FAQ` | Perguntas frequentes sobre serviços |
| Termos de uso | `/UseTerms` | Condições de uso da plataforma |
| Privacidade | `/PrivacyTerms` | Política de privacidade |
| Login | `/login` | Entrada na plataforma |
| Redefinir senha | `/password/reset/:token` | Recuperação de senha |

---

## Plataforma logada — por perfil

### Ex-colaborador

| Área | Caminho | Descrição |
|---|---|---|
| Painel inicial | `/platform` | Agenda, pesquisa, simulador, mentorias |
| Pesquisa pós-demissão | `/survey` | NPS, mapa de sentimentos, perguntas da empresa |
| Simulador — apresentação | `/interviewSimulatorPresentation` | Introdução ao simulador |
| Simulador — uso | `/interviewSimulator` | Entrevista simulada com IA |
| Construtor de currículo — apresentação | `/resumeCreatorPresentation` | Introdução ao construtor |
| Construtor de currículo | `/resumeCreator` | Montagem do currículo |
| Meus pedidos | `/orders` | Histórico de compras |
| Meu perfil | `/profile` | Dados pessoais |

### Especialista de RH

| Área | Caminho | Descrição |
|---|---|---|
| Painel inicial | `/platform` | Agenda de atendimentos |
| Disponibilizar horários | `/providesTimetables` | Cadastro de disponibilidade |
| Ver produtos do usuário | `/viewProductsUser` | Acompanhamento e entrega de serviços |
| Meu perfil | `/profile` | Dados pessoais |

### Administrador da empresa

| Área | Caminho | Descrição |
|---|---|---|
| Painel Executivo de Riscos e Impactos | `/platform` | Demais cards de impacto (placeholders) |
| Pesquisa quantitativa | `/rh/indicadores/quantitativa` | KPIs (e-NPS, riscos, realocação, etc.) + pós-demissão / sentimentos |
| Pesquisa qualitativa | `/rh/indicadores/qualitativa` | Respostas textuais (consulta) |
| Funcionários / programa | `/program-people` | Pessoas do programa de recolocação |
| Contrate Open to Work | `/replacementsReport` | Lista de profissionais OTW (outras empresas); filtros cargo/área/cidade/estado |

### Administrador da plataforma

| Área | Caminho | Descrição |
|---|---|---|
| Painel inicial | `/platform` | Relatórios, cliques, importação de dados |
| Empresas | `/companies` | Cadastro e gestão de empresas parceiras |
| Usuários | `/users` | Cadastro e gestão de todos os usuários |
| Funcionários | `/companies/employees` | Ex-colaboradores vinculados às empresas |
| Planos de assinatura | `/subscriptionPlans` | Planos disponíveis na plataforma |
| Especialistas | `/specialists` | Cadastro de consultores de RH |
| Produtos | `/products` | Catálogo de serviços |
| Perguntas qualitativas | `/surveyQuestions` | Gestão de perguntas da pesquisa por empresa |
| Grupos de vídeos do simulador | `/simulatorVideosGroups` | Organização de conteúdo do simulador |
| Vídeos do simulador | `/simulatorVideos` | Vídeos usados no simulador |
| Adicionar produto para usuário | `/addProductToUser` | Atribuição manual de serviços |
| Mentorias coletivas | `/mentoring` | Gestão de sessões em grupo |
| Materiais gratuitos | `/materials` | Gestão de conteúdos educativos |
| Ver produtos do usuário | `/viewProductsUser` | Acompanhamento de entregas |
| Relatório de recolocação / Open to Work | `/replacementsReport` | COMPANY_ADMIN: consulta OTW; ADMIN: mesma rota (pool completo) |
| Meu perfil | `/profile` | Dados pessoais |

---

## Diagrama de navegação simplificado

```mermaid
flowchart TD
  subgraph site [Site Público]
    Home[/]
    Produtos[/ProductList]
    Kit[/KitRecolocacao]
    Demissao[/demissaohumanizada]
    Patrocinio[/patrocinio/empresa]
  end

  subgraph auth [Autenticação]
    Login[/login]
  end

  subgraph platform [Plataforma Logada]
    Platform[/platform]
    Survey[/survey]
    Simulator[/interviewSimulator]
    Orders[/orders]
    AdminTools[Empresas, Usuários, Produtos...]
  end

  Home --> Produtos
  Home --> Demissao
  Produtos --> Login
  Kit --> Login
  Patrocinio --> Login
  Login --> Platform
  Platform --> Survey
  Platform --> Simulator
  Platform --> Orders
  Platform --> AdminTools
```

## Relacionado com

- [Como a plataforma se organiza](como-a-plataforma-se-organiza.md)
- [Perfis de acesso](../02-quem-usa/perfis-de-acesso.md)
- [Visão geral do site](../03-site-publico/visao-geral-do-site.md)
- [Visão geral da plataforma logada](../04-plataforma-logada/visao-geral.md)
