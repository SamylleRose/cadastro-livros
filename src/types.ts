
export interface Book {
  id: number
  titulo: string
  autor: string
  paginas: number
  ano: number
  created_at?: string 
}

export type BookForm = {
  titulo: string
  autor: string
  paginas: number | null
  ano: number | null
}
