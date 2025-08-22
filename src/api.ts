import axios from 'axios'
import { supabase } from './lib/supabaseClient' 

const api = axios.create({
  baseURL: 'http://localhost:3000',
})


api.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession()

    
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
