import './Pagination.css';

/**
 *função auxiliar que gera a lista de páginas e reticências
 */
function getPageList(current, total) {
  const delta = 1; //número de páginas ao lado da página atual
  const pages = [];

  // p1 - seleciona as páginas importantes (Primeira, Última e as Vizinhas da atual)
  for (let i = 1; i <= total; i += 1) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i);
    }
  }

  // p2 - insere os '...' ou preenche números faltantes onde houver lacunas
  const withDots = [];
  let last = null;

  pages.forEach((page) => {
    if (last !== null) {
      if (page - last === 2) {
        //se a diferença for de apenas 1 número (ex: 1 e 3), coloca o número do meio (2) em vez de '...'
        withDots.push(last + 1);
      } else if (page - last > 1) {
        //se houver uma lacuna maior (ex: 1 e 5), coloca as reticências '...'
        withDots.push('...');
      }
    }
    withDots.push(page);
    last = page;
  });

  return withDots;
}

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }) {
  //texto de resumo (ex: "mostrando 11–20 de 50")
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  //cálculo
  //gera a lista dinâmica de páginas para renderizar
  const pageList = getPageList(currentPage, totalPages);

  return (
    <div className="pagination">
      {/*texto informativo à esquerda */}
      <span className="pagination__summary">
        {totalItems === 0 ? 'Nenhum resultado' : `Mostrando ${start}–${end} de ${totalItems}`}
      </span>

      {/*botoes de controle da paginação*/}
      <div className="pagination__controls">
        
        {/*botao 'anterior' - desabilita na primeira página*/}
        <button
          type="button"
          className="pagination__btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Anterior
        </button>

        {/*mapeia a lista tratada de páginas e reticências*/}
        {pageList.map((page, index) =>
          page === '...' ? (
            /*renderiza as reticências */
            <span key={`dots-${index}`} className="pagination__dots">
              …
            </span>
          ) : (
            /*renderiza o botão numérico da página*/
            <button
              key={page}
              type="button"
              className={`pagination__page ${page === currentPage ? 'is-active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined} //atributo para acessibilidade
            >
              {page}
            </button>
          )
        )}

        {/*botao 'próximo' - desabilita na última página */}
        <button
          type="button"
          className="pagination__btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}