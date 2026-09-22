import { useState, useEffect } from 'react';
import { validateProduct } from '../utils/validation.js'; // função utilitária de validação do formulário
import './Modal.css';

// formato padrão para resetar o formulário ao criar um novo produto
const emptyForm = { nome: '', categoria: '', preco: '', estoque: '', status: 'ativo' };


export default function ProductModal({ mode, product, onSave, onClose }) {
  // - mode: 'create' ou 'edit' (define se estamos criando ou editando)
  // - product: dados do produto selecionado (usado apenas no modo 'edit')
  // - onSave: função enviada pelo pai que salva os dados
  // - onClose: função para fechar o modal sem salvar

  // estado local com os valores dos campos do formulário
  const [values, setValues] = useState(emptyForm);
  // estado local para guardar mensagens de erro de validação (ex: { nome: 'nome é obrigatório' })
  const [errors, setErrors] = useState({});

  // efeito executado sempre que o modal abre ou altera entre criação/edição
  useEffect(() => {
    if (mode === 'edit' && product) {
      // preenche o formulário com os dados do produto recebido
      setValues({
        nome: product.nome,
        categoria: product.categoria,
        preco: String(product.preco),   // converte número em texto para o input
        estoque: String(product.estoque), // converte número em texto para o input
        status: product.status,
      });
    } else {
      // limpa os campos se for a criação de um novo produto
      setValues(emptyForm);
    }
    // limpa os erros de validação anteriores
    setErrors({});
  }, [mode, product]);

  // função genérica para atualizar qualquer campo do formulário conforme o usuário digita
  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  // ação executada ao clicar no botão 'Salvar produto'
  function handleSubmit(e) {
    e.preventDefault(); // Impede o recarregamento automático da página
    
    // executa a função de validação com os valores atuais do estado
    const validationErrors = validateProduct(values);
    
    // se houver algum erro no formulário...
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // exibe as mensagens de erro nos campos
      return;                       // interrompe o envio
    }
    
    //se não houver erros, envia os dados válidos para a função onSave
    onSave(values);
  }

  return (
    /*fundo escuro que fecha o modal ao ser clicado*/
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      
      {/*caixa interna do formulário */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(e) => e.stopPropagation()} //impede o fechamento ao clicar dentro da caixa
      >
        {/*título dinâmico baseado no modo 'edit' ou 'create'*/}
        <h2 id="product-modal-title" className="modal__title">
          {mode === 'edit' ? 'Editar produto' : 'Novo produto'}
        </h2>

        {/*formulário com validação HTML nativa desativada (noValidate) para usar nossa lógica de erros*/}
        <form onSubmit={handleSubmit} noValidate>
          
          {/*campo nome*/}
          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={values.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
            />
            {/*renderização condicional da mensagem de erro*/}
            {errors.nome && <span className="field__error">{errors.nome}</span>}
          </div>

          {/*campo categoria */}
          <div className="field">
            <label htmlFor="categoria">Categoria</label>
            <input
              id="categoria"
              type="text"
              value={values.categoria}
              onChange={(e) => handleChange('categoria', e.target.value)}
            />
            {errors.categoria && <span className="field__error">{errors.categoria}</span>}
          </div>

          {/*linha dividida para preço e estoque */}
          <div className="field-row">
            <div className="field">
              <label htmlFor="preco">Preço (R$)</label>
              <input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                value={values.preco}
                onChange={(e) => handleChange('preco', e.target.value)}
              />
              {errors.preco && <span className="field__error">{errors.preco}</span>}
            </div>

            <div className="field">
              <label htmlFor="estoque">Estoque</label>
              <input
                id="estoque"
                type="number"
                step="1"
                min="0"
                value={values.estoque}
                onChange={(e) => handleChange('estoque', e.target.value)}
              />
              {errors.estoque && <span className="field__error">{errors.estoque}</span>}
            </div>
          </div>

          {/*campo status (ativo / inativo) */}
          <div className="field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={values.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          {/*botoes do form*/}
          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">
              Salvar produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}