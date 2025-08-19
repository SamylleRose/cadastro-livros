<template>
  <div class="home-container">
    <header class="home-header">
      <h1>Bem-vindo à sua Biblioteca</h1>
      <button @click="handleLogout" class="logout-btn">Sair</button>
    </header>

    <main>
      <p>Aqui você poderá gerenciar todos os seus livros.</p>
    </main>
  </div>
</template>

<script setup lang="ts">
// 1. Importe o composable de autenticação
import { useAuth } from '../composables/useAuth'

// 2. Pegue a função handleLogout do composable
const { handleLogout } = useAuth()
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.home-header h1 {
  margin: 0;
  font-size: 2em;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #e74c3c; /* Vermelho para indicar uma ação de "saída" */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>
