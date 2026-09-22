import './ProductTable.css';

//definição das colunas da tabela que podem ser ordenadas
const columns = [
  { key: 'nome', label: 'Nome' },
  { key: 'categoria', label: 'Categoria' },
  { key: 'preco', label: 'Preço' },
  { key: 'estoque', label: 'Estoque' },
  { key: 'status', label: 'Status' },
];

//formatador nativo do js para exibir números como Moeda Brasileira (R$ 1.250,00)
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

//recebe a lista de produtos, o estado de ordenação e as funções de callback
export default function ProductTable({ products, sort, onSort, onEdit, onDelete }) {
  return (
    <div className="product-table__wrapper">
      <table className="product-table">
      
        <thead>
          <tr>
            {/*mapeia as colunas dinamicamente para gerar os botões de ordenação */}
            {columns.map((coluna) => {
              //verifica se a coluna atual é a coluna pela qual os dados estão ordenados
              const ativo = sort.field === coluna.key;
              //exibe a seta de direção se a coluna estiver ativa
              const seta = ativo ? (sort.direction === 'asc' ? '↑' : '↓') : '';

              return (
                <th key={coluna.key}>
                  <button
                    type="button"
                    className="product-table__sort"
                    onClick={() => onSort(coluna.key)} //chama a ordenação para essa coluna
                    aria-label={`Ordenar por ${coluna.label}`}
                  >
                    <span>{coluna.label}</span>
                    <span className="product-table__arrow">{seta}</span>
                  </button>
                </th>
              );
            })}
            {/*coluna extra de ações (não ordenável) */}
            <th className="product-table__actions-head">Ações</th>
          </tr>
        </thead>

        {/*corpo da Tabela */}
        <tbody>
          {/*exibe mensagem caso não existam produtos para exibir */}
          {products.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="product-table__empty">
                Nenhum produto encontrado com os filtros atuais.
              </td>
            </tr>
          )}

          {/*mapeia cada produto para criar uma linha na tabela (<tr>) */}
          {products.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              {/* Aplica a formatação em Reais no preço */}
              <td>{currency.format(produto.preco)}</td>
              <td>{produto.estoque}</td>
              <td>
                {/*badge/Etiqueta visual estilizada de acordo com o status */}
                <span className={`badge badge--${produto.status}`}>
                  {produto.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              {/*botoes de ação para cada linha */}
              <td className="product-table__actions">
                <button type="button" className="link-btn" onClick={() => onEdit(produto)}>
                  Editar
                </button>
                <button
                  type="button"
                  className="link-btn link-btn--danger"
                  onClick={() => onDelete(produto)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}