<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <div class="auth-header">
        <h2>Recuperar Senha</h2>
        <p>Digite seu e-mail para receber o link de redefinição.</p>
      </div>

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
      </form>

      <div class="back-to-login">
        <router-link to="/">Voltar para o Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

const email = ref('')
const loading = ref(false)
const message = ref<string | null>(null)
// Ajustado para corresponder às classes CSS: 'success' foi mapeado para a classe padrão do feedback
const messageType = ref<'success' | 'error'>('success')

const handlePasswordReset = async () => {
  try {
    loading.value = true
    message.value = null

    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
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
/* 3. CSS COMPLETAMENTE SUBSTITUÍDO pelo estilo do AuthView.vue */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; /* Fonte padrão e moderna */
  padding: 20px;
}

/* 2. ESTILO DO CONTAINER DO FORMULÁRIO */
.auth-container {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  text-align: center;
}
.auth-header h2 {
  margin: 0 0 8px 0; /* Ajuste fino na margem para subtítulo */
  font-size: 24px;
  color: #2c3e50;
  font-weight: 700;
}
.auth-header p {
  margin: 0 0 30px 0;
  color: #7f8c8d;
  font-size: 16px;
}
.auth-form .form-group {
  margin-bottom: 20px;
  text-align: left;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #34495e;
}
.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}
.form-group input:focus {
  outline: none;
  border-color: #42b983;
}
.feedback-message {
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
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
  transition: background-color 0.3s;
}
.submit-btn:hover {
  background-color: #36a374;
}
.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.back-to-login {
  /* Estilo para o link 'Voltar para o Login' */
  margin-top: 30px;
  color: #7f8c8d;
}
.back-to-login a {
  color: #42b983; /* Mesma cor dos outros links */
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}
@media (max-width: 480px) {
  .auth-container {
    padding: 25px;
  }
  .auth-header h2 {
    font-size: 22px;
  }
}
</style>
