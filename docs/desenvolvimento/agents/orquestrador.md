# Agente: Orquestrador (principal)

## Missão

**Agente padrão do repositório.** Analisa qualquer tarefa de desenvolvimento, escolhe automaticamente o agente especializado e as skills corretas, e executa — **sem o usuário precisar especificar**.

## Como funciona

1. Usuário descreve a tarefa normalmente (ex.: *"adiciona filtro na listagem de empresas"*)
2. Orquestrador classifica → Plataforma CRUD → skill `preparame-crud-usar-componentes`
3. Implementa seguindo padrões do projeto

## Skill Cursor

**`preparame-orquestrador`** — sempre ativa via rule `.cursor/rules/orquestrador-dev.mdc`

## Matriz resumida

| Tarefa | Agente delegado |
|---|---|
| Site, landing, loja | Site público |
| Login, rotas, menu | Auth e rotas |
| CRUD existente | Plataforma CRUD + usar-componentes |
| CRUD novo | Plataforma CRUD + criar-componentes |
| Painel USER | Ex-colaborador |
| NPS, dashboards | Pesquisas e relatórios |
| Pagamentos | Integrações |
| Task ampla | Orquestrador + domínio identificado |

Matriz completa na skill `preparame-orquestrador`.

## Para o usuário

Basta descrever o que precisa. Exemplos:

- *"Corrige o botão do carrinho"* → Site público (automático)
- *"Nova tela admin de cupons"* → CRUD criar (automático)
- *"Ex-colaborador não vê simulador"* → Ex-colaborador (automático)

## Referências

- [Skill orquestrador](../../../.cursor/skills/preparame-orquestrador/SKILL.md)
- [Catálogo de agentes](README.md)
- [AGENTS.md](../../../AGENTS.md)
