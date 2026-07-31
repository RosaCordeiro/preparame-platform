# Visão geral da plataforma logada

## Para quem é

Usuários autenticados de qualquer perfil que precisam entender como funciona a área restrita da Prepara.me.

## O que é

A **plataforma logada** é a área da Prepara.me que exige login. É onde ex-colaboradores usam ferramentas de recolocação, especialistas gerenciam atendimentos, RH de empresas acompanha indicadores e a equipe interna opera a plataforma.

## Onde encontrar

- Login: `/login`
- Após autenticação: redirecionamento automático para `/platform` ou página que tentava acessar

## Como funciona

### Entrada na plataforma

1. Usuário acessa `/login` (diretamente ou ao tentar área restrita)
2. Informa e-mail e senha
3. Sistema valida credenciais e identifica o perfil
4. Redireciona ao painel correspondente

### Recuperação de senha

- Usuário solicita redefinição informando o e-mail
- Recebe link por e-mail (`/password/reset/:token`)
- Define nova senha e retorna ao login

### Estrutura da área logada

| Elemento | Descrição |
|---|---|
| **Cabeçalho** | Logo, menu hambúrguer, perfil do usuário |
| **Menu lateral** | Opções específicas do perfil (drawer) |
| **Painel central** | Conteúdo principal — muda por perfil e página |
| **Perfil** | Acesso a dados pessoais (`/profile`) |

### Painel por perfil

Ao acessar `/platform`, cada perfil vê um painel diferente:

| Perfil | Painel |
|---|---|
| Ex-colaborador | Agenda, pesquisa, simulador, mentorias |
| Especialista | Agenda de atendimentos |
| Administrador da empresa | Dashboard de indicadores |
| Administrador da plataforma | Relatórios e ferramentas operacionais |

## O que o usuário vê e pode fazer

| Ação | Todos os perfis | Apenas alguns perfis |
|---|---|---|
| Fazer login/logout | Sim | — |
| Ver painel personalizado | Sim | — |
| Editar perfil | Sim | — |
| Responder pesquisa | — | Ex-colaborador |
| Usar simulador | — | Ex-colaborador |
| Gerenciar empresas | — | Administrador |
| Ver dashboard de RH | — | Administrador da empresa |

## Regras importantes

- Sem login válido, **nenhuma página da plataforma logada** é acessível
- Se o usuário tentava acessar uma página específica antes do login, é redirecionado para ela após autenticar
- O menu lateral só aparece se o perfil tiver itens configurados
- Cada sessão mantém o perfil até logout

## Relacionado com

- [Perfis de acesso](../02-quem-usa/perfis-de-acesso.md)
- [Painel do ex-colaborador](painel-do-ex-colaborador.md)
- [Painel do especialista](painel-do-especialista.md)
- [Painel do RH da empresa](painel-do-rh-empresa.md)
- [Painel do administrador](painel-do-administrador.md)
- [Como a plataforma se organiza](../01-visao-geral/como-a-plataforma-se-organiza.md)
