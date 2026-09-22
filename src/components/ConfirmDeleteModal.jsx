import './Modal.css'; // estilização do modal

export default function ConfirmDeleteModal({ product, onConfirm, onCancel }) {
  // se nenhum produto for passado para o modal, ele não renderiza nada na tela (retorna null)
  if (!product) return null;

  return (
    /* fundo escurecido/semi-transparente do modal. 
       ao clicar nele, executa o onCancel p fechar */
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      
      {/*caixa do modal principal */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        /*impede que o clique DENTRO da caixa do modal feche ele acidentalmente 
           (cancela o evento de clique de subir/borbulhar para o 'modal-overlay')*/
        onClick={(e) => e.stopPropagation()}
      >
        {/*titulo do modal*/}
        <h2 id="confirm-title" className="modal__title">
          Excluir produto
        </h2>

        {/*texto explicativo exibindo o nome do produto dinamicamente*/}
        <p className="modal__text">
          Deseja realmente excluir <strong>{product.nome}</strong>? Essa ação não pode ser desfeita.
        </p>

        {/*botao d acao */}
        <div className="modal__actions">
          {/*botao cancelar: executa a função onCancel*/}
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancelar
          </button>
          
          {/*botao excluir: executa a função onConfirm que faz a exclusao real*/}
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}