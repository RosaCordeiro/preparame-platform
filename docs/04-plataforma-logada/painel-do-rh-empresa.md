# Painel do RH da empresa

## Para quem é

Gestores de RH das empresas parceiras (perfil administrador da empresa).

## O que é

O painel do RH é a área analítica do administrador da empresa após login. O menu separa **KPIs de risco/impacto** (Painel) dos **indicadores de pesquisa** (quantitativa e qualitativa).

## Onde encontrar

Após login → Painel de riscos e impactos (`/platform`)

Menu lateral:
- Painel de riscos e impactos (`/platform`)
- Indicadores de riscos
  - Pesquisa quantitativa (`/rh/indicadores/quantitativa`)
  - Pesquisa qualitativa (`/rh/indicadores/qualitativa`)
- Contrate Open to Work
- Ver Pessoas do Programa

## Componentes por visão

### Painel de riscos e impactos
- Cards complementares de impacto / placeholders “em breve” (demais indicadores do grid)
- **Não** exibe os KPIs de e-NPS, riscos, realocação, rescisão e pendências (estes estão na Pesquisa quantitativa)

### Pesquisa quantitativa
- **e-NPS**, **Risco trabalhista**, **Risco de marca**, **Realocados**, **Acolhidos**, **Pessoas realocadas**, **Cálculos da rescisão**, **Pendências trabalhistas**
- **Avaliação pós-demissão** — notas atribuídas pelos ex-colaboradores
- **Mapa de sentimentos** — distribuição emocional e comparativos

### Pesquisa qualitativa
- **Perguntas da empresa** — respostas textuais (somente consulta; cadastro pelo Admin da plataforma)

### Filtros
As três visões permitem filtrar por:
- **Período** — intervalo de datas
- **Unidade** — filial ou área da empresa
- Outros parâmetros configurados para a empresa

Alguns filtros só ficam ativos após seleção de parâmetros obrigatórios.

### Visualizações
Gráficos e tabelas que consolidam respostas da pesquisa pós-demissão dos ex-colaboradores vinculados à empresa.

## Como funciona

1. RH da empresa faz login e abre o Painel ou Indicadores
2. Seleciona filtros (período, unidade) para refinar a visão
3. Analisa indicadores e identifica pontos de atenção
4. Usa insights para ações de melhoria no processo de demissão

## O que o usuário vê e pode fazer

| Ação | Onde |
|---|---|
| Ver demais cards do Painel | Menu → Painel de riscos e impactos |
| Ver KPIs (e-NPS, riscos, realocação, etc.) | Menu → Indicadores → Pesquisa quantitativa |
| Ver avaliação pós-demissão e sentimentos | Menu → Indicadores → Pesquisa quantitativa |
| Ver respostas qualitativas | Menu → Indicadores → Pesquisa qualitativa |
| Filtrar por período e unidade | Painel / Indicadores → filtros |
| Analisar mapa de sentimentos | Indicadores → Pesquisa quantitativa |
| Identificar riscos (KPIs) | Indicadores → Pesquisa quantitativa |
| Consultar funcionários vinculados | Gestão de funcionários |

## O que o RH NÃO vê

- Dados de **outras empresas**
- Informações pessoais além do necessário para indicadores agregados
- Ferramentas de gestão da plataforma (produtos, especialistas, perguntas qualitativas, etc.)

## Regras importantes

- Dados filtrados **automaticamente** pela empresa do login
- Indicadores e respostas dependem de ex-colaboradores **terem respondido** a pesquisa
- **Anonimato:** filtros com poucos respondentes (≤ limiar no backend, default 5) não exibem dados daquele recorte ao RH
- Perguntas qualitativas (cadastradas pelo Admin da plataforma) aparecem na **terceira etapa** da pesquisa
- Quanto mais respostas, mais confiáveis os indicadores

## Relacionado com

- [Administrador da empresa](../02-quem-usa/administrador-da-empresa.md)
- [Dashboard do RH](../08-pesquisas-e-indicadores/dashboard-do-rh.md)
- [Mapa de sentimentos](../08-pesquisas-e-indicadores/mapa-de-sentimentos.md)
- [Jornada do RH da empresa](../07-jornadas/jornada-do-rh-empresa.md)
- [Pesquisa pós-demissão](../08-pesquisas-e-indicadores/pesquisa-pos-demissao.md)
