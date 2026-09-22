// chave fixa usada p/ salvar e buscar a lista no localstorage do navegador
const STORAGE_KEY = 'produtos';

// busca os produtos salvos no localstorage e os converte de texto json para objeto javascript
export function getProducts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Não foi possível ler produtos salvos:', err);
    return null;
  }
}

// converte a lista de produtos em texto json e salva no localstorage
export function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Não foi possível salvar os produtos:', err);
  }
}

// gera um id único para novos produtos usando a api nativa crypto ou um fallback de data e caracteres aleatórios
export function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// fornece uma lista inicial de produtos fictícios quando o localstorage está vazio
export function seedProducts() {
  return [
    { id: 'p1', nome: 'Notebook Dell Inspiron', categoria: 'Eletrônicos', preco: 3499.9, estoque: 15, status: 'ativo' },
    { id: 'p2', nome: 'Mouse sem fio Logitech', categoria: 'Eletrônicos', preco: 89.9, estoque: 42, status: 'ativo' },
    { id: 'p3', nome: 'Cadeira de escritório', categoria: 'Móveis', preco: 649.0, estoque: 8, status: 'ativo' },
    { id: 'p4', nome: 'Monitor 24" Full HD', categoria: 'Eletrônicos', preco: 799.9, estoque: 0, status: 'inativo' },
    { id: 'p5', nome: 'Mesa de escritório', categoria: 'Móveis', preco: 459.0, estoque: 12, status: 'ativo' },
    { id: 'p6', nome: 'Teclado mecânico', categoria: 'Eletrônicos', preco: 259.9, estoque: 27, status: 'ativo' },
    { id: 'p7', nome: 'Luminária de mesa LED', categoria: 'Casa', preco: 119.9, estoque: 33, status: 'ativo' },
    { id: 'p8', nome: 'Papel A4 (pacote 500fl)', categoria: 'Papelaria', preco: 24.9, estoque: 120, status: 'ativo' },
    { id: 'p9', nome: 'Caneta esferográfica (caixa)', categoria: 'Papelaria', preco: 18.5, estoque: 0, status: 'inativo' },
    { id: 'p10', nome: 'Headset com microfone', categoria: 'Eletrônicos', preco: 189.9, estoque: 19, status: 'ativo' },
    { id: 'p11', nome: 'Estante de aço', categoria: 'Móveis', preco: 389.0, estoque: 5, status: 'ativo' },
    { id: 'p12', nome: 'Filtro de linha 5 tomadas', categoria: 'Eletrônicos', preco: 39.9, estoque: 60, status: 'ativo' },
  ];
}