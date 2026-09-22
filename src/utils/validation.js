// função que recebe os valores do formulário e valida campo por campo
export function validateProduct(values) {
  // objeto que acumulará os erros encontrados (se estiver vazio, os dados são válidos)
  const errors = {};

  // valida o nome: verifica se está vazio ou apenas com espaços em branco
  if (!values.nome || !values.nome.trim()) {
    errors.nome = 'Informe o nome do produto.';
  }

  // valida a categoria: verifica se está vazia ou apenas com espaços em branco
  if (!values.categoria || !values.categoria.trim()) {
    errors.categoria = 'Informe a categoria.';
  }

  // converte a string do preço para número
  const preco = Number(values.preco);
  
  // valida o preço: não pode ser vazio, null, NaN (não número) ou menor/igual a zero
  if (values.preco === '' || values.preco === null || Number.isNaN(preco) || preco <= 0) {
    errors.preco = 'O preço deve ser um número positivo.';
  }

  // converte a string do estoque para número
  const estoque = Number(values.estoque);
  
  // valida o estoque: não pode ser vazio, null, NaN, decimal ou menor que zero
  if (
    values.estoque === '' ||
    values.estoque === null ||
    Number.isNaN(estoque) ||
    !Number.isInteger(estoque) ||
    estoque < 0
  ) {
    errors.estoque = 'O estoque deve ser um número inteiro maior ou igual a zero.';
  }

  // retorna o objeto contendo os erros encontrados (ex: { nome: '...', preco: '...' })
  return errors;
}