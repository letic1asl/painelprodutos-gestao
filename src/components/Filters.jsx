import './Filters.css';

export default function Filters({ filters, onChange, categories }) {
  return (
    <div className="filters">
      {/*campo de busca por nome*/}
      <div className="filters__field filters__field--search">
        <label htmlFor="filtro-nome">Buscar por nome</label>
        <input
          id="filtro-nome"
          type="text"
          placeholder="Digite o nome do produto"
          value={filters.nome}
          
          // atualiza o estado do filtro de nome ao digitar
          onChange={(e) => onChange({ ...filters, nome: e.target.value })}
        />
      </div>

      {/* seleção de categoria */}
      <div className="filters__field">
        <label htmlFor="filtro-categoria">Categoria</label>
        <select
          id="filtro-categoria"
          value={filters.categoria}
          // atualiza o estado do filtro de categoria ao selecionar
          onChange={(e) => onChange({ ...filters, categoria: e.target.value })}
        >
          <option value="">Todas</option>
          {/* renderiza a lista de categorias dinamicamente */}
          {categories.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {/* seleção de status */}
      <div className="filters__field">
        <label htmlFor="filtro-status">Status</label>
        <select
          id="filtro-status"
          value={filters.status}
          // atualiza o estado do filtro de status (ativo/inativo)
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>
    </div>
  );
}