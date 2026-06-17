# Produtos e pedidos

## Para quem é

Administradores da plataforma, ex-colaboradores que acompanham compras e equipe de operação.

## O que é

A gestão de **produtos e pedidos** cobre o catálogo de serviços (configuração admin) e o ciclo de compras (pedidos dos ex-colaboradores).

## Onde encontrar

- **Produtos (admin):** Menu → Produtos (`/products`)
- **Atribuição manual:** Menu → Adicionar Produto para Usuário (`/addProductToUser`)
- **Pedidos (ex-colaborador):** Menu → Meus Pedidos (`/orders`)

## Gestão de produtos (administrador)

### Campos do produto

| Campo | Descrição |
|---|---|
| Nome | Título do serviço |
| Nome resumido | Versão curta |
| Preço | Valor em reais |
| Duração | Tempo (mentorias) |
| Tipo | Agendado ou não agendado |
| Situação | Ativo ou inativo |
| Destaque | Mais vendido ou normal |

### Ações
- Criar, editar e desativar produtos
- Definir preços e tipos
- Marcar produtos em destaque no catálogo

## Pedidos

### Fluxo de pedido (compra)
1. Ex-colaborador adiciona produto ao carrinho
2. Finaliza pagamento
3. Pedido é criado com status de pagamento
4. Após confirmação, serviço é vinculado à conta
5. Ex-colaborador acompanha em Meus Pedidos

### Atribuição manual (admin)
Quando serviço não vem de compra — patrocínio ou cortesia:
1. Admin acessa **Adicionar Produto para Usuário**
2. Seleciona usuário e produto
3. Serviço é vinculado à conta sem pedido de compra

## O que cada perfil vê

| Perfil | Visão |
|---|---|
| Ex-colaborador | Seus pedidos e status |
| Administrador | Todos produtos, atribuições, catálogo |
| Especialista | Serviços dos clientes (Ver Produtos do Usuário) |

## Status típicos de pedido

| Status | Significado |
|---|---|
| Aguardando pagamento | Boleto gerado ou pagamento pendente |
| Pago | Pagamento confirmado, serviço liberado |
| Em andamento | Serviço sendo executado |
| Concluído | Entrega finalizada |

## Regras importantes

- Produtos **inativos** não aparecem no catálogo público
- Atribuição manual é comum em **patrocínios empresariais**
- Cada serviço agendado consome uma unidade do saldo
- Pedidos do Kit Pro liberam simulador por 3 meses

## Relacionado com

- [Catálogo de serviços](../05-produtos-e-servicos/catalogo-de-servicos.md)
- [Jornada de compra individual](../07-jornadas/jornada-compra-individual.md)
- [Pagamentos](pagamentos.md)
- [Agendamentos e entregas](agendamentos-e-entregas.md)
