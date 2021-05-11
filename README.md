# Database Relation

<h3 align="center">
  Desafio 09: Relacionamentos com banco de dados no Node.js
</h3>

## Tecnologias

- Node.Js
- TypeScript
- TypeOrm

## Objetivo

- Criar os endpoints com express e sastifazer os testes criado pelo desafio. Os dados devem ser salvos no Postgres. Foi colocado em prática os conceitos da tecnologias propostas no módulo, entre eles são: Node.js, TypeOrm, TypeScript, Solid e Express

## Rotas da aplicação

 - **`POST /customers`**: A rota deve receber `name` e `email` dentro do corpo da requisição, sendo o `name` o nome do cliente a ser cadastrado. Ao cadastrar um novo cliente, ele deve ser armazenado dentro do seu banco de dados e deve ser retornado o cliente criado. Ao cadastrar no banco de dados, na tabela `customers` deverá possuir os campos `name`, `email`, `created_at`, `updated_at`.

- **`POST /products`**: Essa rota deve receber `name`, `price` e `quantity` dentro do corpo da requisição, sendo o `name` o nome do produto a ser cadastrado, `price` o valor unitário e `quantity` a quantidade existente em estoque do produto. Com esses dados devem ser criados no banco de dados um novo produto com os seguintes campos: `name`, `price`, `quantity`, `created_at`, `updated_at`.

- **`POST /orders/`**: Nessa rota você deve receber no corpo da requisição o `customer_id` e um array de products, contendo o `id` e a `quantity` que você deseja adicionar a um novo pedido. Aqui você deve cadastrar na tabela `orders` um novo pedido, que estará relacionado ao `customer_id` informado, `created_at` e `updated_at` . Já na tabela `orders_products`, você deve armazenar o `product_id`, `order_id`, `price` e `quantity`, `created_at` e `updated_at`.

- **`GET /orders/:id`**: Essa rota deve retornar as informações de um pedido específico, com todas as informações que podem ser recuperadas através dos relacionamentos entre a tabela `orders`, `customers` e `orders_products`.

**Bônus**

- **`PUT /products/update`**: Essa rota deve receber `id`, `name`, `price` e `quantity` dentro do corpo da requisição, sendo o `id` o ID do produto a ser atualizado, `name` o nome do produto a ser alterado (ou não), `price` o valor unitário e `quantity` a quantidade para ser atualizada. Com esses dados devem ser criados no banco de dados um novo produto com os seguintes campos: `name`, `price`, `quantity`, `created_at`, `updated_at`.

***
Rota criada com intuito de praticar o que foi ensinado em aula.
