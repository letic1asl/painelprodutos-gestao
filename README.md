## Painel de Produtos

Aplicação front-end em React para gestão e administração de produtos. O sistema permite listar, filtrar, ordenar, cadastrar, editar e excluir produtos, mantendo a persistência dos dados diretamente no navegador através do localStorage.

## Funcionalidades
Tabela de produtos:
- Colunas ordenáveis com um clique no cabeçalho.
- Exibição limpa com estados vazios e indicação visual de ordenação.

Filtros combináveis:
- Busca dinâmica por nome do produto.
- Filtro por categoria.
- Filtro por status (ex: ativo, inativo, fora de estoque).

Paginação integrada:
- Navegação entre páginas limitadas a 8 itens por página.

Modais interativos:
- Modal para cadastro e edição de produtos com validação em tempo real.
- Modal de confirmação antes de realizar exclusões irreversíveis.

Persistência de dados:
- Armazenamento automático no localStorage do navegador (os dados permanecem salvos após recarregar a página).

Interface responsiva:
Adaptada para telas de desktop, tablet e celular.

## Tecnologias
React
JavaScript (ES6+)
Vite
HTML5 e CSS3
LocalStorage

## Pré-requisitos
É necessário ter o Node.js instalado (recomenda-se a versão LTS).

Para verificar se o Node.js está instalado corretamente, rode no terminal:

```bash
node --version
npm --version
```
## Como executar?
Abra o terminal na pasta do projeto:

```bash
cd web_app
```

Instale as dependências:
```bash
npm install
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O Vite exibirá um endereço semelhante a:
```text
http://localhost:5173/
```
NÃO abra esse endereço no navegador..

> Não abra o arquivo index.html diretamente pelo explorador de arquivos. Como se trata de uma aplicação React com Vite, os módulos precisam ser servidos pelo servidor de desenvolvimento.

Para encerrar o servidor, pressione `Ctrl + C` no terminal.

## Scripts disponíveis

```bash
npm run dev       # inicia o servidor de desenvolvimento
npm run build     # gera a versão de produção em dist/
npm run preview   # visualiza localmente a versão compilada
```

## Estrutura do projeto
```text
src/
├── components/
│    ├── ConfirmDeleteModal.jsx
│    ├── Filters.css
│    ├── Filters.jsx
│    ├── Modal.css
│    ├── Pagination.css
│    ├── Pagination.jsx
│    ├── ProductModal.jsx
│    ├──  ProductTable.css
│    └── ProductTable.jsx
├── hooks/
│   └── useProducts.js
├── pages/
│   └── Dashboard.jsx
├── utils/
│   ├── storage.js
│   └── validation.js
├── App.jsx
└── main.jsx
```

## Responsabilidade dos módulos
- `App.jsx`: Ponto de entrada da interface principal.
- `Dashboard.jsx`: Coordena os filtros, a tabela, a paginação e a exibição dos modais.
- `useProducts.js`: Hook customizado responsável por centralizar o estado dos produtos, regras do CRUD ordenação, aplicação dos filtros e persistência no localStorage.
- `TabelaProdutos.jsx`: Renderiza a listagem de produtos com suporte a clique para ordenação das colunas.
- `Filtros.jsx`: Formulário de consulta por texto, categoria e status.
- `Paginacao.jsx`: Controla o fatiamento da lista e a navegação por páginas.
- `ModalProduto.jsx`: Coleta os dados para criação ou edição de um item com feedbacks de erro.
- `ModalConfirmacao.jsx`: Solicita a confirmação do usuário antes de remover um registro.
- `validation.js`: Reúne as regras de validação dos campos obrigatórios (nome, categoria, preço, estoque, etc.).
- `storage.js`: Encapsula as funções de leitura e escrita no localStorage.

## Modelo de dados
Cada produto é armazenado no localStorage sob o seguinte formato JSON:

```js
JSON
{
  "id": "uuid-v4",
  "nome": "Notebook Gamer",
  "categoria": "Eletrônicos",
  "preco": 4500.00,
  "estoque": 12,
  "status": "ativo"
}
```

Os dados ficam salvos exclusivamente no navegador na chave:

```text
produtos
```

Nota: Não há dependência de banco de dados, API externa ou autenticação de usuário.

Resetar os dados de teste
Caso queira restaurar os dados padrão do sistema ou limpar todos os registros criados durante o uso:

- Abra o painel com a aplicação rodando no navegador.
- Abra o Console do Desenvolvedor (F12 no teclado ou Botão direito > Inspecionar > Console).

> Execute o comando:
JavaScript
localStorage.removeItem('produtos');
Recarregue a página (F5).

## Build de produção
Para verificar se o projeto pode ser compilado sem erros para publicação:

```bash
npm run build
```
Os arquivos estáticos otimizados serão gerados dentro da pasta dist/.

## Observações
- A aplicação foi projetada para funcionar 100% offline e no lado do cliente (client-side).
- Como os dados ficam salvos no localStorage, cada navegador ou dispositivo terá seu próprio conjunto de dados.
- Mantenha o arquivo package-lock.json no repositório para garantir a reprodução exata das dependências instaladas.