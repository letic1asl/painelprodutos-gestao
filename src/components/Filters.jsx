import './Filters.css';

export default function Filters({ filters, onChange, categories }) {
  return (
    <div className="filters">
      <div className="filters__field filters__field--search">
        <label htmlFor="filtro-nome">Buscar por nome</label>
        <input
          id="filtro-nome"
          type="text"
          placeholder="Digite o nome do produto"
          value={filters.nome}
          onChange={(e) => onChange({ ...filters, nome: e.target.value })}
        />
      </div>

      <div className="filters__field">
        <label htmlFor="filtro-categoria">Categoria</label>
        <select
          id="filtro-categoria"
          value={filters.categoria}
          onChange={(e) => onChange({ ...filters, categoria: e.target.value })}
        >
          <option value="">Todas</option>
          {categories.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__field">
        <label htmlFor="filtro-status">Status</label>
        <select
          id="filtro-status"
          value={filters.status}
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
