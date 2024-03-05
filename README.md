# Dashboard Financeiro💲
Esta aplicação financeira é um monolito com duas pastas, sendo referentes ao frontend e backend, onde o backend roda Laravel na porta 8000 e o frontend roda Angular na porta 4200
 ## Documentação da API 📃

#### Porta principal do Backend: `localhost:8000/api/`

#### - SEÇÃO DE `DESPESAS`

#### Retorna todas despesas

```http
  GET /api/expenses
```

#### Retorna uma despesa

```http
  GET /api/expenses/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da despesa |

#### Registra uma despesa

```http
  POST /api/expenses/
```

| Corpo da requisição   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome da despesa |
| `ammount`      | `float` | **Obrigatório**. O preço da despesa |
| `method`      | `string` | **Obrigatório**. O método de pagamento da despesa |
| `category`      | `string` | **Obrigatório**. O ID da categoria |
| `date`      | `date` | **Obrigatório**. O nome da despesa |
| `due_date`      | `date` | **Obrigatório**. O date de validade da despesa |
| `hasInstallments`      | `boolean` | **Obrigatório**. Se a despesa têm parcelas |
| `installments`      | `number` | **Obrigatório**. Quantas parcelas tem ( padrão: 0 ) |

#### Atualiza uma despesa

```http
  PATCH /api/expenses/${id}
```

| Parametro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da despesa |

| Corpo da requisição   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | O nome da despesa |
| `ammount`      | `float` |  O preço da despesa |
| `method`      | `string` |  O método de pagamento da despesa |
| `category`      | `string` | O ID da categoria |
| `date`      | `date` |  O nome da despesa |
| `due_date`      | `date` |  O date de validade da despesa |
| `hasInstallments`      | `boolean` |  Se a despesa têm parcelas |
| `installments`      | `number` |  Quantas parcelas tem ( padrão: 0 ) |

#### Deleta uma despesa

```http
  DELETE /api/expenses/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da despesa |

#### - SEÇÃO DE `RECEITAS`

#### Retorna todas receitas

```http
  GET /api/incomes
```

#### Retorna uma receita

```http
  GET /api/incomes/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da receita |

#### Registra uma receita

```http
  POST /api/incomes/
```

| Corpo da requisição   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome da receita |
| `ammount`      | `float` | **Obrigatório**. O preço da receita |
| `method`      | `string` | **Obrigatório**. O método de pagamento da receita |
| `category`      | `string` | **Obrigatório**. O ID da categoria |
| `date`      | `date` | **Obrigatório**. A data da receita |
| `isInvestment`      | `date` | **Obrigatório**. Se a receita é de um investimento |
| `isLoan`      | `boolean` | **Obrigatório**. Se a receita é de empréstimo |

#### Atualiza uma receita

```http
  PATCH /api/incomes/${id}
```

| Parametro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da receita |

| Corpo da requisição   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | O nome da receita |
| `ammount`      | `float` | O preço da receita |
| `method`      | `string` | O método de pagamento da receita |
| `category`      | `string` | O ID da categoria |
| `date`      | `date` | A data da receita |
| `isInvestment`      | `date` | Se a receita é de um investimento |
| `isLoan`      | `boolean` | Se a receita é de empréstimo |

#### Deleta uma receita

```http
  DELETE /api/incomes/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da receita |

#### - SEÇÃO DE `CATEGORIAS`

#### Retorna todas categorias

```http
  GET /api/categories
```

#### Retorna uma categoria

```http
  GET /api/categories/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da categoria |

#### Registra uma categoria

```http
  POST /api/categories/
```

| Corpo da requisição   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome da categoria |
| `color`      | `float` | **Obrigatório**. A cor da categoria |

#### Atualiza uma categoria

```http
  PATCH /api/categories/${id}
```

| Parametro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da despesa |

| Corpo da requisição   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome da categoria |
| `color`      | `float` | **Obrigatório**. A cor da categoria |

#### Deleta uma categoria

```http
  DELETE /api/categories/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da categoria |

#### - SEÇÃO DE `ANALISES`

#### Retorna dados de analise deste mês

OBS: Essa requisição retorna algumas analises como: total gasto com despesas deste mês, total de receitas deste mês, último registro de receita e gasto e porcentagem da receita deste mês se comparado com as despesas

```http
  GET /api/analytics
```