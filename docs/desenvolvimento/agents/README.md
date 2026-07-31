# Agentes de desenvolvimento

Cada agente é uma **persona de trabalho** com escopo definido de arquivos, padrões e documentação de produto relacionada.

## Como usar

**Padrão:** descreva a tarefa normalmente — o **[Orquestrador](orquestrador.md)** (`preparame-orquestrador`) escolhe o agente e as skills automaticamente.

**Manual (opcional):** consulte o catálogo abaixo se quiser entender escopos ou forçar um agente específico.

## Catálogo

| Agente | Skill | Roteamento |
|---|---|---|
| **[Orquestrador](orquestrador.md)** | `preparame-orquestrador` | Tarefas já especificadas |
| **[Novas demandas](novas-demandas.md)** | `preparame-novas-demandas` | **Feature nova — 8 fases** |
| [Site público](site-publico.md) | `preparame-site-publico` | Via orquestrador |
| [Plataforma CRUD](plataforma-crud.md) | `preparame-crud-admin` (+ usar/criar) | Via orquestrador |
| [Auth e rotas](autenticacao-rotas.md) | `preparame-router-auth` | Via orquestrador |
| [Ex-colaborador](ex-colaborador.md) | `preparame-ex-colaborador` | Via orquestrador |
| [Pesquisas e relatórios](pesquisas-relatorios.md) | `preparame-nps-relatorios` | Via orquestrador |
| [Integrações](integracoes.md) | `preparame-pagamentos-pedidos` | Via orquestrador |

## Template de cada agente

Todo arquivo de agente contém:
- **Missão** — responsabilidade
- **Escopo** — pastas e arquivos
- **Padrões** — o que seguir
- **Checklist** — antes de concluir
- **Referências** — produto + skill
