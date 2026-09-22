  # Painel de Produtos.
Painel administrativo de gestão de produtos onde todos os dados ficam salvos no `localStorage` do navegador.

## Funcionalidades:
- Tabela de produtos com colunas ordenáveis (clique no cabeçalho);
- Filtros combináveis por nome, categoria e status;
- Paginação (8 itens por página);
- Modal de cadastro e edição, com validação de campos;
- Modal de confirmação antes de excluir;
- Persistência automática no `localStorage` (os dados sobrevivem a recarregamentos)

## Como rodar?
```bash
npm install
npm run dev
```

Depois abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).
Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura.
```
src/
  components/   Tabela, filtros, paginação e modais (componentes reutilizáveis);
  pages/        Dashboard.jsx — página principal do painel;
  hooks/        useProducts.js — CRUD, filtros e persistência centralizados;
  utils/        storage.js (localStorage) e validation.js (regras do formulário).
```

## Resetar os dados.
Para voltar aos dados de exemplo, abra o console do navegador na página e rode:

```js
localStorage.removeItem('produtos');
```
Depois recarregue a página.