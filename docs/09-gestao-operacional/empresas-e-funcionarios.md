# Empresas e funcionários

## Para quem é

Administradores da plataforma e gestores de RH que gerenciam vínculos entre empresas e ex-colaboradores.

## O que é

A gestão de **empresas e funcionários** permite cadastrar empresas parceiras, configurar patrocínios e vincular ex-colaboradores desligados a cada organização.

## Onde encontrar

- **Empresas:** Menu admin → Empresas (`/companies`)
- **Funcionários:** Menu admin → Funcionários (`/companies/employees`)
- **Segmentos / Subsegmentos:** Menu admin → Cadastros → Segmentos (`/segments`) e Subsegmentos (`/subsegments`)

## Gestão de empresas

### O que se configura por empresa

| Campo | Descrição |
|---|---|
| Nome | Razão social ou nome fantasia |
| Segmento | Classificação macro de mercado (**opcional**) |
| Subsegmento | Classificação específica dentro do segmento (**opcional**; deve pertencer ao segmento) |
| Logo | Imagem exibida na página de patrocínio |
| Cores | Personalização visual (fundo, texto) |
| Token de patrocínio | Identificador para vincular cadastros |
| Serviços | Pacote contratado |

### Ações disponíveis
- Criar nova empresa
- Editar dados e configurações visuais
- Listar e filtrar empresas cadastradas
- Configurar página de patrocínio

## Gestão de funcionários

### O que são "funcionários" na plataforma
Registros de **ex-colaboradores vinculados** a uma empresa — pessoas que foram desligadas e têm ou terão acesso ao programa de patrocínio.

### Ações disponíveis
- Cadastrar funcionário individualmente
- **Importação em lote** — carga de múltiplos registros de uma vez
- Editar dados do funcionário
- Vincular token de patrocínio
- Listar e filtrar por empresa

### Quem acessa
- **Administrador da plataforma:** gestão completa
- **Administrador da empresa:** gestão dos funcionários da própria empresa

## Como funciona o vínculo

1. Empresa é cadastrada na plataforma
2. Funcionários (ex-colaboradores) são registrados — individual ou em lote
3. Cada registro pode ter token de patrocínio
4. Ex-colaborador se cadastra via link de patrocínio
5. Sistema associa conta ao registro de funcionário e à empresa

## Regras importantes

- Cada empresa tem **link de patrocínio exclusivo**
- Importação em lote agiliza onboarding de grandes desligamentos
- Funcionário vinculado ≠ usuário cadastrado (pode existir registro antes do cadastro)
- RH da empresa vê apenas funcionários da **própria organização**

## Relacionado com

- [Cadastro patrocinado](../06-demissao-responsavel/cadastro-patrocinado.md)
- [Página de patrocínio](../03-site-publico/pagina-de-patrocinio.md)
- [Programa para empresas](../06-demissao-responsavel/programa-para-empresas.md)
- [Usuários e perfis](usuarios-e-perfis.md)
