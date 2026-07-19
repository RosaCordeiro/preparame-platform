# Pesquisa pós-demissão

## Para quem é

Ex-colaboradores que respondem a pesquisa e equipes que analisam os resultados.

## O que é

A **pesquisa pós-demissão** é um formulário estruturado em até três etapas que coleta a percepção dos ex-colaboradores sobre a experiência de demissão. É peça central do programa de demissão responsável.

## Onde encontrar

- Painel do ex-colaborador → card de convite
- URL direta: `/survey`

## Etapas da pesquisa

### Etapa 1 — Perguntas NPS
Perguntas de satisfação usando escala NPS (Net Promoter Score). Avaliam:
- Experiência geral com a demissão
- Qualidade do apoio recebido
- Satisfação com a empresa e com a Prepara.me

**Regra:** todas as perguntas devem ser respondidas para avançar.

### Etapa 2 — Mapa de sentimentos
Ex-colaborador seleciona sentimentos que descrevem como se sente após a demissão.

**Regra:** ao menos um sentimento deve ser selecionado.

Veja lista completa em [Mapa de sentimentos](mapa-de-sentimentos.md).

### Etapa 3 — Perguntas da empresa (opcional)
Se o administrador da plataforma configurou perguntas qualitativas para a empresa, elas aparecem nesta etapa. Exemplos:
- Como foi a comunicação da demissão?
- Você se sentiu apoiado pelo gestor?
- O que poderia ter sido diferente?

**Regra:** só aparece se a empresa tiver perguntas cadastradas.

## Como funciona

1. Ex-colaborador vê convite no painel (se ainda não respondeu)
2. Clica e inicia pesquisa na Etapa 1
3. Responde perguntas NPS e avança
4. Seleciona sentimentos na Etapa 2
5. Responde perguntas da empresa (se houver) na Etapa 3
6. Confirma finalização — sistema avisa que não poderá refazer
7. Respostas são salvas e processadas nos indicadores

## O que acontece após responder

- Card de convite **desaparece** do painel
- Tentativa de acessar `/survey` novamente mostra mensagem: "Pesquisa já respondida"
- Dados alimentam **dashboard do RH** da empresa
- Administrador pode exportar respostas em Excel

## Regras importantes

| Regra | Detalhe |
|---|---|
| Resposta única | Não é possível responder duas vezes |
| Irreversível | Após confirmar finalização, não há retorno |
| Plano aposentadoria | Pesquisa não é exibida |
| Perguntas obrigatórias | Todas NPS devem ser respondidas |
| Sentimentos | Mínimo de um selecionado |

## Relacionado com

- [Mapa de sentimentos](mapa-de-sentimentos.md)
- [Dashboard do RH](dashboard-do-rh.md)
- [Jornada pós-demissão — pesquisa](../07-jornadas/jornada-pos-demissao-pesquisa.md)
- [Administrador da empresa](../02-quem-usa/administrador-da-empresa.md)
