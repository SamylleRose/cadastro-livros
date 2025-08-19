import { createClient } from '@supabase/supabase-js'

// Pega a URL e a chave do arquivo .env que criamos no passo anterior
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Cria a conexão/cliente do Supabase usando suas credenciais
// e exporta para que possamos usá-lo em qualquer parte do nosso código
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
