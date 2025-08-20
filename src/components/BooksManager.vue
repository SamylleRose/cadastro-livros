<template>
  <div class="books-container">
    <header class="books-header">
      <h2>Meus Livros</h2>
      <button @click="showAddBookModal" class="add-book-btn">Adicionar Livro</button>
    </header>
    <div class="books-table-wrapper">
      <table class="books-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Páginas</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td data-label="Título">{{ book.title }}</td>
            <td data-label="Autor">{{ book.author }}</td>
            <td data-label="Páginas">{{ book.pages }}</td>
            <td data-label="Ano">{{ book.publicationYear }}</td>
            <td data-label="Ações">
              <a href="#" class="action-link">Editar</a>
              <a @click.prevent="deleteBook(book.id)" href="#" class="action-link delete-link"
                >Excluir</a
              >
            </td>
          </tr>

          <tr v-if="books.length === 0">
            <td colspan="5" class="no-books">Nenhum livro cadastrado ainda.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalVisible" class="modal-overlay" @click.self="closeAddBookModal">
      <div class="modal-content">
        <h2>Adicionar Novo Livro</h2>
        <form @submit.prevent="addBook">
          <div class="form-group">
            <label for="title">Título do Livro</label>
            <input type="text" id="title" v-model="newBook.title" required />
          </div>
          <div class="form-group">
            <label for="author">Autor Principal</label>
            <input type="text" id="author" v-model="newBook.author" required />
          </div>
          <div class="form-group">
            <label for="pages">Quantidade de Páginas</label>
            <input type="number" id="pages" v-model="newBook.pages" required />
          </div>
          <div class="form-group">
            <label for="year">Ano de Publicação</label>
            <input type="number" id="year" v-model="newBook.publicationYear" required />
          </div>
          <div class="modal-actions">
            <button type="button" @click="closeAddBookModal" class="btn-cancel">Cancelar</button>
            <button type="submit" class="btn-save">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
// import axios from 'axios'

// // 1. ESTADO: Criamos um "lugar" para guardar a lista de livros.
// // A função ref() torna a variável reativa, ou seja, se o valor dela mudar,
// // o Vue automaticamente atualiza a tela.
// const books = ref([])

// // 2. BUSCANDO OS DADOS DO BACKEND:
// // A função 'fetchBooks' vai fazer a chamada para a sua API.
// const fetchBooks = async () => {
//   try {
//     // ATENÇÃO: Troque a URL pela URL real da sua API!
//     const response = await axios.get('http://localhost:3000/api/books')
//     // Guardamos a lista de livros que veio da API na nossa variável reativa.
//     books.value = response.data
//   } catch (error) {
//     console.error('Erro ao buscar os livros:', error)
//     // Aqui você pode mostrar uma mensagem de erro para o usuário.
//   }
// }

// // ... dentro de <script setup>

// const deleteBook = async (bookId) => {
//   // Confirmação para evitar exclusões acidentais
//   if (!confirm('Tem certeza que deseja excluir este livro?')) {
//     return
//   }

//   try {
//     // ATENÇÃO: Use a URL correta do seu back-end, passando o ID
//     await axios.delete(`http://localhost:3000/api/books/${bookId}`)
//     // Se a exclusão no back-end deu certo, removemos o livro da nossa
//     // lista local (books.value) para atualizar a tela sem precisar recarregar.
//     books.value = books.value.filter((book) => book.id !== bookId)
//     // Aqui você pode mostrar uma mensagem de sucesso.
//     alert('Livro excluído com sucesso!')
//   } catch (error) {
//     console.error('Erro ao excluir o livro:', error)
//     // Aqui você pode mostrar uma mensagem de erro.
//     alert('Falha ao excluir o livro. Tente novamente.')
//   }
// }

// const isModalVisible = ref(false)

// // Estado para guardar os dados do novo livro que está sendo preenchido no formulário
// const newBook = ref({
//   title: '',
//   author: '',
//   pages: null,
//   publicationYear: null,
// })

// const showAddBookModal = () => {
//   // Reseta o formulário antes de abrir
//   newBook.value = { title: '', author: '', pages: null, publicationYear: null }
//   isModalVisible.value = true
// }

// const closeAddBookModal = () => {
//   isModalVisible.value = false
// }

// const addBook = async () => {
//   try {
//     // ATENÇÃO: URL da sua API para CRIAR um livro (geralmente é POST)
//     const response = await axios.post('http://localhost:3000/api/books', newBook.value)

//     // Adiciona o livro recém-criado (que o backend retorna) na nossa lista
//     books.value.push(response.data)

//     // Fecha o modal e mostra mensagem de sucesso
//     closeAddBookModal()
//     alert('Livro adicionado com sucesso!')
//   } catch (error) {
//     console.error('Erro ao adicionar livro:', error)
//     // Aqui você pode ler as 'Mensagens de erro/sucesso' do seu backend
//     // e mostrá-las para o usuário de forma mais elegante.
//     alert('Falha ao adicionar o livro. Verifique os dados.')
//   }
// }
// // 3. CICLO DE VIDA:
// // 'onMounted' é uma função do Vue que executa um código assim que o
// // componente é "montado" (carregado) na tela. É o lugar perfeito
// // para buscar os dados iniciais.
// onMounted(() => {
//   fetchBooks()
// })

//=============================================================================================

import { ref, onMounted } from 'vue'

// REMOVEMOS a importação do 'axios', pois não vamos usá-lo agora.

// --- 1. DADOS MOCADOS (MOCK DATA) ---
// Esta é nossa "base de dados" temporária no front-end.
const books = ref([])

// Esta função simula a busca inicial de dados.
const fetchBooks = () => {
  // Vamos preencher nossa lista com alguns exemplos quando a página carregar.
  books.value = [
    {
      id: 1,
      title: 'O Senhor dos Anéis',
      author: 'J.R.R. Tolkien',
      pages: 1200,
      publicationYear: 1954,
    },
    {
      id: 2,
      title: 'O Guia do Mochileiro das Galáxias',
      author: 'Douglas Adams',
      pages: 208,
      publicationYear: 1979,
    },
    {
      id: 3,
      title: 'Duna',
      author: 'Frank Herbert',
      pages: 688,
      publicationYear: 1965,
    },
  ]
}

// onMounted executa a função fetchBooks assim que o componente é carregado.
onMounted(() => {
  fetchBooks()
})

// --- 2. LÓGICA DO MODAL E DO FORMULÁRIO (continua igual) ---
const isModalVisible = ref(false)
const newBook = ref({
  title: '',
  author: '',
  pages: null,
  publicationYear: null,
})

const showAddBookModal = () => {
  newBook.value = { title: '', author: '', pages: null, publicationYear: null }
  isModalVisible.value = true
}

const closeAddBookModal = () => {
  isModalVisible.value = false
}

// --- 3. FUNÇÕES MODIFICADAS (SEM BACKEND) ---

// Função para ADICIONAR um novo livro (agora salva só na lista local)
const addBook = () => {
  // Verificação simples para garantir que o título não está vazio
  if (!newBook.value.title) {
    alert('O título é obrigatório!')
    return
  }

  // Como não temos backend, precisamos criar um ID único manualmente.
  // Usar a data atual em milissegundos é uma forma simples de fazer isso.
  const bookToAdd = {
    ...newBook.value,
    id: Date.now(),
  }

  // Adicionamos o novo livro diretamente ao nosso array 'books'.
  books.value.push(bookToAdd)

  // Limpamos o formulário e fechamos o modal.
  closeAddBookModal()
  alert('Livro adicionado (temporariamente) com sucesso!')
}

// Função para DELETAR um livro (agora remove só da lista local)
const deleteBook = (bookId) => {
  if (!confirm('Tem certeza que deseja excluir este livro?')) {
    return
  }

  // Usamos .filter() para criar um novo array sem o livro com o ID correspondente.
  books.value = books.value.filter((book) => book.id !== bookId)

  alert('Livro excluído (temporariamente) com sucesso!')
}
</script>

<style scoped>
/* ESTILOS GERAIS (DESKTOP) */
.books-container {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 4rem;
  box-sizing: border-box;
}

.books-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.books-header h2 {
  font-size: 1.6rem;
  font-weight: bold;
}

.add-book-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-book-btn:hover {
  background-color: #0056b3;
}

.books-table-wrapper {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.books-table {
  width: 90%;
  border-collapse: collapse;
}

.books-table th,
.books-table td {
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
}

.books-table th {
  color: #888;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.books-table tr:last-child td {
  border-bottom: none;
}

.action-link {
  color: #007bff;
  text-decoration: none;
  margin-right: 1rem;
  font-weight: 500;
}

.delete-link {
  color: #dc3545;
}

.no-books {
  text-align: center;
  padding: 2rem;
  color: #888;
}

/* ESTILOS DO MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.modal-content h2 {
  margin-top: 0;
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}
.modal-actions button {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
.btn-cancel {
  background-color: #f0f0f0;
}
.btn-save {
  background-color: #007bff;
  color: white;
}

/* ======================================================= */
/* CSS RESPONSIVO PARA TELAS MENORES (MOBILE)              */
/* ======================================================= */

@media (max-width: 768px) {
  /* 1. Ajustes no Container e Cabeçalho */

  .books-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  /* 
  .add-book-btn {
    width: 100%; /* Botão ocupa a largura toda */
}

.books-table-wrapper {
  padding: 0;
  box-shadow: none;
  background-color: transparent;
}

/* 2. Esconde o cabeçalho original da tabela */
.books-table thead {
  display: none;
}

/* 3. Transforma a tabela, linhas e células em blocos */
.books-table,
.books-table tbody,
.books-table tr,
.books-table td {
  display: block;
  width: 100%;
}

/* 4. Estiliza cada linha como um "card" */
.books-table tr {
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
}

.books-table tr:last-child {
  margin-bottom: 0;
}

/* Remove estilos de borda desnecessários da célula */
.books-table td {
  border: none;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 1rem;
  display: flex; /* Flexbox para alinhar label e valor */
  justify-content: space-between; /* Empurra o label para um lado e o valor para o outro */
  align-items: center;
  text-align: right; /* Alinha o texto do valor à direita */
}

.books-table td:last-child {
  padding-bottom: 0;
}

/* 5. Cria o "rótulo" usando o data-label */
.books-table td::before {
  content: attr(data-label);
  font-weight: bold;
  color: #333;
  text-align: left; /* Alinha o texto do rótulo à esquerda */
  margin-right: 1rem;
}

/* 6. Estilo específico para a célula de Ações */
td[data-label='Ações'] {
  justify-content: flex-start; /* Alinha os botões no início */
  padding-top: 0.5rem;
  gap: 1rem;
}

/* Esconde o texto "Ações:" que não é necessário */
td[data-label='Ações']::before {
  display: none;
}

/* 7. Ajustes no Modal para Mobile */
.modal-content {
  width: 90%;
  margin-top: -10vh; /* Sobe um pouco o modal */
}

.modal-actions {
  flex-direction: column-reverse; /* Botão principal fica por cima */
  gap: 0.75rem;
}

.modal-actions button {
  width: 100%;
}
</style>
