<template>
  <div class="auth-container">
    <h2>Recuperar Senha</h2>
    <p>Digite seu e-mail e enviaremos um link para você redefinir sua senha.</p>

    <form @submit.prevent="handlePasswordReset" class="auth-form">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" required placeholder="seu@email.com" />
      </div>

      <div v-if="message" :class="['feedback-message', messageType]">
        {{ message }}
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Enviando...' : 'Enviar Link' }}
      </button>

      <div class="back-to-login">
        <router-link to="/">Voltar para o Login</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const email = ref('')
const loading = ref(false)
const message = ref<string | null>(null)
const messageType = ref<'success' | 'error'>('success')

const handlePasswordReset = async () => {
  try {
    loading.value = true
    message.value = null

    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      // IMPORTANTE: Crie esta página no seu router depois
      redirectTo: `${window.location.origin}/update-password`,
    })

    if (error) throw error

    messageType.value = 'success'
    message.value = 'Se um usuário com este e-mail existir, um link de recuperação foi enviado.'
  } catch (error) {
    messageType.value = 'error'
    if (error instanceof Error) {
      message.value = error.message
    } else {
      message.value = 'Ocorreu um erro ao tentar enviar o link.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Reutilizando os estilos do AuthView.vue */
.auth-container {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  text-align: center;
}
.auth-form .form-group {
  margin-bottom: 20px;
  text-align: left;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}
.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  box-sizing: border-box;
}
.feedback-message {
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
}
.feedback-message.success {
  background-color: #d4edda;
  color: #155724;
}
.feedback-message.error {
  background-color: #f8d7da;
  color: #721c24;
}
.submit-btn {
  width: 100%;
  padding: 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}
.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.back-to-login {
  margin-top: 20px;
}
.back-to-login a {
  color: #2980b9;
  text-decoration: none;
}
</style>
