# Jornada do RH da empresa

## Para quem é

Gestores de RH de empresas parceiras que utilizam o programa de demissão responsável.

## O que é

A **jornada do RH da empresa** descreve como o gestor de RH utiliza a plataforma — desde o primeiro acesso ao dashboard até ações de melhoria baseadas em indicadores.

## Fluxo completo

```mermaid
flowchart TD
  Contrato[Empresa contrata Prepara.me] --> Config[Admin configura empresa e perguntas]
  Config --> Acesso[RH recebe acesso]
  Acesso --> Dashboard[Dashboard de indicadores]
  Dashboard --> Filtros[Aplicar filtros]
  Filtros --> Analise[Analisar e-NPS e sentimentos]
  Analise --> Convite[Ex-colaboradores respondem pesquisa]
  Convite --> Dashboard
  Analise --> Acoes[Ações de melhoria no processo]
```

## Passo a passo

### 1. Contratação e configuração
- Empresa contrata programa via contato comercial
- Administrador Prepara.me configura empresa (logo, cores, serviços)
- Administrador da plataforma cadastra perguntas qualitativas da empresa, se necessário
- RH recebe credenciais de acesso (perfil administrador da empresa)

### 2. Primeiro acesso
- RH faz login e acessa o **Painel de riscos e impactos** (`/platform`)
- Vê KPIs iniciais (podem estar vazios até haver respostas)
- No menu, **Indicadores de riscos** abre submenu com pesquisa quantitativa e qualitativa

### 3. Acompanhamento
- Ex-colaboradores respondem pesquisa após demissão (incluindo perguntas qualitativas, se houver)
- Dados atualizam as três visões (Painel / quantitativa / qualitativa)
- RH aplica filtros (período, unidade) para análise segmentada

### 4. Análise e ação
- No Painel: monitora e-NPS e riscos (marca, trabalhista)
- Em Indicadores → Quantitativa: identifica padrões no mapa de sentimentos e notas pós-demissão
- Em Indicadores → Qualitativa: lê respostas textuais (sem cadastrar perguntas)
- Toma ações: ajuste no processo de demissão, comunicação, treinamentos

### 5. Gestão de funcionários
- Consulta lista de ex-colaboradores vinculados
- Verifica quem respondeu pesquisa e quem utilizou serviços

## Indicadores que o RH acompanha

| Indicador | O que revela |
|---|---|
| e-NPS | Satisfação geral com o processo |
| Mapa de sentimentos | Como ex-colaboradores se sentem |
| Risco de marca | Potencial dano à reputação empregadora |
| Risco trabalhista | Sinais de insatisfação que podem gerar conflitos |

## Regras importantes

- RH vê dados **apenas da própria empresa**
- Indicadores dependem de **respostas dos ex-colaboradores**
- Quanto mais respostas, mais confiável a análise
- Perguntas qualitativas são cadastradas pelo **administrador da plataforma**, não pelo RH

## Relacionado com

- [Administrador da empresa](../02-quem-usa/administrador-da-empresa.md)
- [Painel do RH da empresa](../04-plataforma-logada/painel-do-rh-empresa.md)
- [Dashboard do RH](../08-pesquisas-e-indicadores/dashboard-do-rh.md)
- [Programa para empresas](../06-demissao-responsavel/programa-para-empresas.md)
