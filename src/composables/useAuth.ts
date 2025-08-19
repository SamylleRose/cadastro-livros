// client/src/composables/useAuth.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

export function useAuth() {
  const router = useRouter()

  // --- ESTADO ---
  const isRegisterMode = ref(false)
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const loading = ref(false)

  const feedbackMessage = ref<string | null>(null)
  const isFeedbackError = ref(false)

  // --- MÉTODOS ---

  // Cadastro
  const handleRegister = async () => {
    if (password.value !== passwordConfirm.value) {
      isFeedbackError.value = true
      feedbackMessage.value = 'As senhas não coincidem!'
      return
    }

    try {
      loading.value = true
      feedbackMessage.value = null

      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })

      // Se o e-mail já existe, o Supabase retorna identities vazio
      if (data?.user?.identities?.length === 0) {
        isFeedbackError.value = true
        feedbackMessage.value = 'Este e-mail já está cadastrado. Faça login ou use outro e-mail.'
        return
      }

      if (error) throw error

      isFeedbackError.value = false
      feedbackMessage.value = 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.'
    } catch (err: unknown) {
      isFeedbackError.value = true
      if (err instanceof Error) {
        feedbackMessage.value = err.message
      } else {
        feedbackMessage.value = 'Erro inesperado ao cadastrar.'
      }
    } finally {
      loading.value = false
    }
  }

  // Login
  const handleLogin = async () => {
    try {
      loading.value = true
      feedbackMessage.value = null

      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error

      isFeedbackError.value = false
      feedbackMessage.value = 'Login realizado com sucesso! Redirecionando...'

      //redirecionar após login
      await router.push('/home')
    } catch (err: unknown) {
      isFeedbackError.value = true
      if (err instanceof Error) {
        if (err.message.includes('Email not confirmed')) {
          feedbackMessage.value = 'E-mail não confirmado. Verifique sua caixa de entrada.'
        } else if (err.message.includes('Invalid login credentials')) {
          feedbackMessage.value = 'E-mail ou senha inválidos.'
        } else {
          feedbackMessage.value = err.message
        }
      } else {
        feedbackMessage.value = 'Ocorreu um erro ao fazer login.'
      }
    } finally {
      loading.value = false
    }
  }

  // Logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      await router.push({ name: 'Auth' })
    } catch (err: unknown) {
      console.error('Erro ao fazer logout:', err)
    }
  }

  // Decide login ou register
  const handleAuth = () => {
    if (isRegisterMode.value) {
      handleRegister()
    } else {
      handleLogin()
    }
  }

  // Alternar modo
  const toggleMode = () => {
    isRegisterMode.value = !isRegisterMode.value
    email.value = ''
    password.value = ''
    passwordConfirm.value = ''
    feedbackMessage.value = null
  }

  return {
    isRegisterMode,
    email,
    password,
    passwordConfirm,
    loading,
    feedbackMessage,
    isFeedbackError,
    handleAuth,
    toggleMode,
    handleLogout,
  }
}
