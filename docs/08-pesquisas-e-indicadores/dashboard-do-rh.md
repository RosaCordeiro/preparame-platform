# Dashboard do RH

## Para quem é

Gestores de RH de empresas parceiras (perfil administrador da empresa).

## O que é

O **dashboard do RH** é o painel analítico que consolida indicadores sobre a experiência pós-demissão dos ex-colaboradores. Permite ao RH monitorar satisfação, sentimentos e riscos, tomando decisões baseadas em dados.

## Onde encontrar

Plataforma logada — perfil administrador da empresa:

| Visão | Rota / menu |
|---|---|
| KPIs (riscos e impactos) | `/platform` — Menu → Painel Executivo de Riscos e Impactos |
| Quantitativa | `/rh/indicadores/quantitativa` — Indicadores → Pesquisa quantitativa |
| Qualitativa | `/rh/indicadores/qualitativa` — Indicadores → Pesquisa qualitativa |

## Indicadores principais

### No Painel
- Demais cards de impacto / placeholders “em breve” (sem os 8 KPIs principais)

### Na Pesquisa quantitativa
- **e-NPS** — satisfação com o processo
- **Risco de marca** / **Risco trabalhista** — sinais derivados das respostas
- **Realocados**, **Acolhidos**, **Pessoas realocadas**, **Cálculos da rescisão**, **Pendências trabalhistas**
- **Avaliação pós-demissão** — notas dos ex-colaboradores
- **Mapa de sentimentos** — distribuição entre alívio, surpresa, injustiça, raiva, urgência, insegurança, tristeza e indiferença

### Na Pesquisa qualitativa
- Respostas textuais às perguntas customizadas da empresa (somente leitura)

## Filtros disponíveis

| Filtro | Função |
|---|---|
| Período | Intervalo de datas das respostas |
| Unidade | Filial, departamento ou área da empresa |
| Empresa | (Visão admin) selecionar empresa específica |

Alguns filtros só ficam ativos após seleção de parâmetros obrigatórios.

## Como funciona

1. RH faz login e escolhe Painel ou Indicadores no menu
2. Seleciona filtros desejados (período, unidade)
3. Visualiza gráficos e indicadores da visão escolhida
4. Identifica pontos de atenção (ex.: alto índice de injustiça)
5. Toma ações: revisão de processo, treinamento de gestores, comunicação

## Benchmark de referência

Pesquisa Prepara.me 2023 indica que empresas que demitem **sem** apoio estruturado tendem a ter:
- **74% pior** em e-NPS
- **36% maior** risco de marca
- **49% maior** risco trabalhista

(comparado a empresas com apoio Prepara.me)

## O que o RH vê e pode fazer

| Ação | Disponível |
|---|---|
| Ver demais cards no Painel | Sim |
| Ver KPIs (e-NPS, riscos, etc.) na quantitativa | Sim |
| Ver pós-demissão e sentimentos (quantitativa) | Sim |
| Ver respostas qualitativas | Sim (consulta) |
| Filtrar por período e unidade | Sim |
| Cadastrar perguntas qualitativas | Não (Admin da plataforma) |
| Ver dados de outras empresas | Não |
| Exportar dados | Não (função do administrador Prepara.me) |

## Regras importantes

- Dados filtrados **automaticamente** pela empresa do login
- Indicadores dependem de ex-colaboradores **terem respondido** a pesquisa
- **Anonimato:** se o filtro resultar em poucos respondentes (≤ limiar configurável no backend, default 5), o RH **não** vê métricas/respostas daquele filtro (`insufficientSample`)
- Dashboard vazio / N/A também pode indicar amostra insuficiente para anonimato
- Perguntas qualitativas customizadas (cadastradas pelo Admin) enriquecem a análise qualitativa

## Relacionado com

- [Painel do RH da empresa](../04-plataforma-logada/painel-do-rh-empresa.md)
- [Pesquisa pós-demissão](pesquisa-pos-demissao.md)
- [Mapa de sentimentos](mapa-de-sentimentos.md)
- [Jornada do RH da empresa](../07-jornadas/jornada-do-rh-empresa.md)
