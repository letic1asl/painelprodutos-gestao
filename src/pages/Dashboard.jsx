import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts.js';
import Filters from '../components/Filters.jsx';
import ProductTable from '../components/ProductTable.jsx';
import Pagination from '../components/Pagination.jsx';
import ProductModal from '../components/ProductModal.jsx';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx';
import './Dashboard.css';

const PAGE_SIZE = 8;

export default function Dashboard() {
  // traz os estados, dados e funções utilitárias do custom hook de produtos
  const {
    products,
    filteredProducts,
    filters,
    setFilters,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  // estado de ordenação: guarda a coluna atual e se a ordem é ascendente ('asc') ou descendente ('desc')
  const [sort, setSort] = useState({ field: 'nome', direction: 'asc' });
  
  // estado da página atual da paginação
  const [page, setPage] = useState(1);
  
  // estado para controlar a modal de cadastro/edição (ex: { mode: 'add' } ou { mode: 'edit', product: ... })
  const [modalState, setModalState] = useState(null);
  
  // estado para controlar a modal de confirmação de exclusão (guarda o produto selecionado para excluir)
  const [productToDelete, setProductToDelete] = useState(null);

  // altera a coluna de ordenação ou inverte a direção se a mesma coluna for clicada novamente
  function handleSort(field) {
    setSort((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { field, direction: 'asc' };
    });
    setPage(1); // reseta para a primeira página ao mudar a ordenação
  }

  // atualiza os filtros e volta para a primeira página
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    setPage(1); // reseta para a primeira página ao alterar o filtro
  }

  // ordena a lista já filtrada dinamicamente conforme a coluna e a direção selecionadas
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    const { field, direction } = sort;
    list.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      if (typeof valA === 'string') {
        // compara textos respeitando acentos e letras minúsculas/maiúsculas
        const compare = valA.toLowerCase().localeCompare(valB.toLowerCase(), 'pt-BR');
        return direction === 'asc' ? compare : -compare;
      }
      // compara números (preço, estoque, etc.)
      return direction === 'asc' ? valA - valB : valB - valA;
    });
    return list;
  }, [filteredProducts, sort]);

  // cálculos matemáticos da paginação
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages); // garante que a página não exceda o limite existente
  
  // recorta os produtos correspondentes apenas à página visível
  const paginatedProducts = sortedProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  // salva o produto (cria um novo ou atualiza um existente) e fecha a modal
  function handleSave(values) {
    if (modalState?.mode === 'edit' && modalState.product) {
      updateProduct(modalState.product.id, values);
    } else {
      addProduct(values);
    }
    setModalState(null); // fecha a modal
  }

  // confirma a exclusão do produto selecionado e fecha a modal de deleção
  function handleConfirmDelete() {
    deleteProduct(productToDelete.id);
    setProductToDelete(null); // fecha a modal
  }

  return (
    <div className="dashboard">
      {/*cabeçalho com título, total de produtos e botão de criação */}
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Painel de Produtos</h1>
          <p className="dashboard__subtitle">
            {products.length} {products.length === 1 ? 'produto cadastrado' : 'produtos cadastrados'} no total
          </p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => setModalState({ mode: 'add' })}>
          Novo produto
        </button>
      </header>

      {/*conteúdo principal: filtros, tabela e paginação */}
      <main className="dashboard__content">
        <Filters filters={filters} onChange={handleFilterChange} categories={categories} />

        <ProductTable
          products={paginatedProducts}
          sort={sort}
          onSort={handleSort}
          onEdit={(produto) => setModalState({ mode: 'edit', product: produto })}
          onDelete={(produto) => setProductToDelete(produto)}
        />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={sortedProducts.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </main>

      {/*renderização condicional da modal de criação/edição */}
      {modalState && (
        <ProductModal
          mode={modalState.mode}
          product={modalState.product}
          onSave={handleSave}
          onClose={() => setModalState(null)}
        />
      )}

      {/*renderização condicional da modal de exclusão */}
      {productToDelete && (
        <ConfirmDeleteModal
          product={productToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </div>
  );
}
