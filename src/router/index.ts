

import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient' 
import AuthView from '../views/AuthView.vue'
import PasswordReset from '../views/PasswordResetView.vue'
import HomeView from '../views/HomeView.vue' 
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
    path: '/home',
    name: 'Home',
    component: HomeView,
   
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/livros', 
    name: 'books',
    component: BooksView, 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach(async (to, from, next) => {
 

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth) {
    
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
     
      next({ name: 'Auth' })
    } else {
      
      next()
    }
  } else {
   
    next()
  }
})

export default router
