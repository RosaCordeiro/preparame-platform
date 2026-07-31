# Usuários e perfis

## Para quem é

Administradores da plataforma responsáveis pelo cadastro e gestão de contas.

## O que é

A gestão de **usuários e perfis** centraliza todas as contas da plataforma — ex-colaboradores, especialistas, RH de empresas e administradores.

## Onde encontrar

Menu admin → Usuários (`/users`)

Perfil pessoal (todos os perfis): `/profile`

## Tipos de perfil

| Perfil | Descrição | Criado por |
|---|---|---|
| Ex-colaborador | Usuário final do programa | Cadastro próprio ou admin |
| Especialista | Consultor de RH | Admin |
| Administrador da empresa | RH da empresa parceira | Admin |
| Administrador da plataforma | Equipe Prepara.me | Admin |

## Dados gerenciados por usuário

| Campo | Descrição |
|---|---|
| Nome | Nome completo |
| E-mail | Login e comunicação |
| CPF | Documento de identificação |
| Tipo de perfil | Ex-colaborador, Especialista, Administrador da empresa ou Administrador da plataforma |
| Token de patrocínio | Vinculação com empresa (quando aplicável) |
| Empresa | Vinculação organizacional |
| Plano de aposentadoria | Flag especial que altera experiência |

## Plano de aposentadoria

Usuários marcados com **plano de aposentadoria** têm experiência diferenciada:

| O que muda | Detalhe |
|---|---|
| Pesquisa pós-demissão | Não exibida |
| Card de boas-vindas | Versão simplificada |
| Serviços | Conforme plano configurado |

## Como funciona

### Criação de usuário
- **Ex-colaborador:** cadastro próprio (site, patrocínio, Kit Pro) ou criação pelo admin
- **Outros perfis:** criados exclusivamente pelo administrador

### Edição
- Admin pode alterar perfil, dados e vinculações
- Usuário pode editar dados pessoais em `/profile`

### Token de patrocínio
- Associa ex-colaborador à empresa parceira
- Preenchido no cadastro via página de patrocínio ou manualmente pelo admin

## O que o administrador pode fazer

| Ação | Disponível |
|---|---|
| Listar e filtrar usuários | Sim |
| Criar usuário de qualquer perfil | Sim |
| Editar dados e perfil | Sim |
| Vincular token de patrocínio | Sim |
| Marcar plano de aposentadoria | Sim |
| Excluir usuário | Conforme regras da plataforma |

## Regras importantes

- Cada conta tem **um único perfil**
- E-mail é identificador único de login
- Token de patrocínio garante vínculo correto com empresa
- Alteração de perfil impacta menu e painel exibidos

## Relacionado com

- [Perfis de acesso](../02-quem-usa/perfis-de-acesso.md)
- [Cadastro patrocinado](../06-demissao-responsavel/cadastro-patrocinado.md)
- [Planos e assinaturas](../05-produtos-e-servicos/planos-e-assinaturas.md)
- [Empresas e funcionários](empresas-e-funcionarios.md)
