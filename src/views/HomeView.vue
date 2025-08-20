<template>
  <div class="home-container">
    <header class="home-header">
      <h1>Biblioteca</h1>
      <button @click="handleLogout" class="logout-btn">Sair</button>
    </header>

    <main>
      <BookManager />
    </main>
  </div>
</template>

<script setup lang="ts">
import BookManager from '@/components/BooksManager.vue'
import { useAuth } from '../composables/useAuth'
const { handleLogout } = useAuth()
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
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
  color: #333;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .home-container {
    padding: 20px 15px;
  }

  .home-header {
    margin-bottom: 20px;
    padding-bottom: 15px;
  }

  .home-header h1 {
    font-size: 1.6em;
  }

  .logout-btn {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>
