// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient' // Importe o Supabase para verificar a sessão
import AuthView from '../views/AuthView.vue'
import PasswordReset from '../views/PasswordResetView.vue'
import HomeView from '../views/HomeView.vue' // 1. Importe sua HomeView
import BooksView from '../components/BooksManager.vue'
const routes = [
  {
    path: '/',
    name: 'Auth',
    component: AuthView,
  },
  {
    path: '/recuperar-senha',
    name: 'PasswordReset',
    component: PasswordReset,
  },
  {
    // 2. Adicione a nova rota para a Home
    path: '/home',
    name: 'Home',
    component: HomeView,
    // 3. Marque esta rota como necessitando de autenticação
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/livros', // O endereço no navegador (ex: seudominio.com/livros)
    name: 'books',
    component: BooksView, // O componente que será exibido nesta rota
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 4. Crie o "Guarda de Navegação"
router.beforeEach(async (to, from, next) => {
  // `to` é a rota para a qual o usuário está indo
  // `from` é a rota de onde o usuário está vindo
  // `next` é uma função que permite ou bloqueia a navegação

  // Verifica se a rota de destino exige autenticação
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth) {
    // Se a rota exige autenticação, verificamos se há uma sessão ativa
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Se NÃO houver sessão, redireciona para a página de login
      next({ name: 'Auth' })
    } else {
      // Se houver sessão, permite o acesso
      next()
    }
  } else {
    // Se a rota não exige autenticação, permite o acesso
    next()
  }
})

export default router
