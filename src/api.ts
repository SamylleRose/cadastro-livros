import axios from 'axios'
import { supabase } from './lib/supabaseClient' // Importe seu cliente Supabase

// A URL base da sua API do backend
const api = axios.create({
  baseURL: 'http://localhost:3000',
})

// Interceptor que adiciona o token JWT do Supabase em cada requisição
api.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession()

    // Se existir uma sessão ativa, adiciona o token de acesso ao cabeçalho Authorization
    if (data.session?.access_token) {
      config.headers.Authorization = `Bearer ${data.session.access_token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
