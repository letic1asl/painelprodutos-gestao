import { useState, useEffect, useMemo, useCallback } from 'react';
import { getProducts, saveProducts, seedProducts, generateId } from '../utils/storage.js';

// estado inicial padrão para limpar os filtros
const initialFilters = { nome: '', categoria: '', status: '' };

export function useProducts() {
  // estado principal de produtos: inicializa buscando do localstorage ou gera dados iniciais
  const [products, setProducts] = useState(() => {
    const stored = getProducts();
    return stored ?? seedProducts();
  });
  
  // estado para guardar os filtros digitados/selecionados pelo usuário
  const [filters, setFilters] = useState(initialFilters);

  // salva automaticamente a lista no localstorage sempre que o estado de produtos mudar
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  // função para adicionar um novo produto formatando os campos
  const addProduct = useCallback((data) => {
    const novoProduto = {
      id: generateId(),
      nome: data.nome.trim(),
      categoria: data.categoria.trim(),
      preco: Number(data.preco),
      estoque: Number(data.estoque),
      status: data.status || 'ativo',
    };
    setProducts((prev) => [...prev, novoProduto]);
  }, []);

  // função para atualizar um produto existente buscando pelo seu id
  const updateProduct = useCallback((id, data) => {
    setProducts((prev) =>
      prev.map((produto) =>
        produto.id === id
          ? {
              ...produto,
              nome: data.nome.trim(),
              categoria: data.categoria.trim(),
              preco: Number(data.preco),
              estoque: Number(data.estoque),
              status: data.status,
            }
          : produto
      )
    );
  }, []);

  // função para remover um produto da lista através do id
  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((produto) => produto.id !== id));
  }, []);

  // calcula e extrai dinamicamente todas as categorias únicas em ordem alfabética
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.categoria).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [products]);

  // filtra os produtos combinando os critérios de nome, categoria e status
  const filteredProducts = useMemo(() => {
    const termo = filters.nome.trim().toLowerCase();
    return products.filter((produto) => {
      const combinaNome = termo === '' || produto.nome.toLowerCase().includes(termo);
      const combinaCategoria = filters.categoria === '' || produto.categoria === filters.categoria;
      const combinaStatus = filters.status === '' || produto.status === filters.status;
      return combinaNome && combinaCategoria && combinaStatus;
    });
  }, [products, filters]);

  // retorna os dados e funções para serem consumidos pelos componentes da aplicação
  return {
    products,
    filteredProducts,
    filters,
    setFilters,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}