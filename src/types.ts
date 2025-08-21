// Esta interface representa a estrutura de um livro, como vem do banco de dados.
export interface Book {
  id: number
  titulo: string
  autor: string
  paginas: number
  ano: number
  created_at?: string // Campo opcional que o Supabase adiciona
}

// Este tipo representa os dados do formulário, que é um livro sem o 'id'.
// Os campos numéricos podem ser 'null' quando o formulário está vazio.
export type BookForm = {
  titulo: string
  autor: string
  paginas: number | null
  ano: number | null
}
