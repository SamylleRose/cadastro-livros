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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const books = ref([])

const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/books')

    books.value = response.data
  } catch (error) {
    console.error('Erro ao buscar os livros:', error)
  }
}

const deleteBook = async (bookId) => {
  if (!confirm('Tem certeza que deseja excluir este livro?')) {
    return
  }

  try {
    await axios.delete(`http://localhost:3000/api/books/${bookId}`)

    books.value = books.value.filter((book) => book.id !== bookId)

    alert('Livro excluído com sucesso!')
  } catch (error) {
    console.error('Erro ao excluir o livro:', error)

    alert('Falha ao excluir o livro. Tente novamente.')
  }
}

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

const addBook = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/books', newBook.value)

    books.value.push(response.data)

    closeAddBookModal()
    alert('Livro adicionado com sucesso!')
  } catch (error) {
    console.error('Erro ao adicionar livro:', error)

    alert('Falha ao adicionar o livro. Verifique os dados.')
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped>
.books-container {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  box-sizing: border-box;
  padding: 2rem;
  border-radius: 8px;
}

.books-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.books-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
}

.add-book-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-book-btn:hover {
  background-color: #0056b3;
}

.books-table-wrapper {
  background-color: white;
  border-radius: 8px;

  border: 1px solid #dee2e6;
  overflow: hidden;
  padding: 0;
}

.books-table {
  width: 100%;
  border-collapse: collapse;
}

.books-table th {
  text-align: left;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
  color: #6c757d;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: none;
  background-color: #fff;
}

.books-table td {
  text-align: left;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
  color: #212529;
  vertical-align: middle;
}

.books-table tr:last-child td {
  border-bottom: none;
}

.books-table td:last-child {
  text-align: right;
}

.action-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.action-link:hover {
  color: #0056b3;
}

.delete-link {
  color: red;
  margin-left: 0.5rem;
}

.action-link:not(:last-child)::after {
  content: '|';
  color: #adb5bd;
  margin-left: 0.75rem;
  font-weight: normal;
}

.no-books {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

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

@media (max-width: 768px) {
  .books-container {
    background-color: transparent;
  }

  .books-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .add-book-btn {
    width: 100%;
  }

  .books-table-wrapper {
    padding: 0;
    box-shadow: none;
    background-color: transparent;
    border: none;
  }

  .books-table thead {
    display: none;
  }

  .books-table,
  .books-table tbody,
  .books-table tr,
  .books-table td {
    display: block;
    width: 98%;
  }

  .books-table tr {
    margin-bottom: 1rem;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 1rem;
  }

  .books-table tr:last-child {
    padding-bottom: 0.5rem;
  }

  .books-table td {
    border: none;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
  }

  .books-table td:last-child {
    padding-bottom: 0;
    justify-content: flex-start;
    padding-top: 0.5rem;
  }

  .books-table td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #333;
    text-align: left;
    margin-right: 1rem;
  }

  .action-link::after {
    display: none;
  }

  .modal-content {
    width: 90%;
    margin-top: -10vh;
  }

  .modal-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }

  .modal-actions button {
    width: 100%;
  }
}
</style>
