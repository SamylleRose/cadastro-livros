<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <div class="auth-header">
        <h2>{{ isRegisterMode ? 'Criar Conta' : 'Login' }}</h2>
        <p>Bem-vindo ao Gerenciador de Livros 📚</p>
      </div>

      <form @submit.prevent="handleAuth" class="auth-form">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" required placeholder="seu@email.com" />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" required placeholder="••••••••" />
        </div>

        <div v-if="isRegisterMode" class="form-group">
          <label for="password-confirm">Confirme a Senha</label>
          <input
            type="password"
            id="password-confirm"
            v-model="passwordConfirm"
            required
            placeholder="••••••••"
          />
        </div>

        <div v-if="feedbackMessage" :class="['feedback-message', { error: isFeedbackError }]">
          {{ feedbackMessage }}
        </div>

        <div v-if="!isRegisterMode" class="forgot-password">
          <router-link to="/recuperar-senha">Esqueceu a senha?</router-link>
        </div>

        <button type="submit" :disabled="loading" class="submit-btn">
          {{ loading ? 'Aguarde...' : isRegisterMode ? 'Cadastrar' : 'Entrar' }}
        </button>
      </form>

      <div class="toggle-mode">
        <p>
          {{ isRegisterMode ? 'Já tem uma conta?' : 'Não tem uma conta?' }}
          <a href="#" @click.prevent="toggleMode">
            {{ isRegisterMode ? 'Faça Login' : 'Cadastre-se' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const {
  isRegisterMode,
  email,
  password,
  passwordConfirm,
  loading,
  feedbackMessage,
  isFeedbackError,
  handleAuth,
  toggleMode,
} = useAuth()
</script>

<style scoped>
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
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  text-align: center;
}
.auth-header .logo {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
.auth-header h2 {
  margin: 0 0 20px 0;
  font-size: 24px;
  color: #2c3e50;
}
.auth-header p {
  margin: 0 0 30px 0;
  color: #7f8c8d;
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
.forgot-password {
  text-align: right;
  margin-bottom: 20px;
  font-size: 14px;
}
.forgot-password a {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
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
.toggle-mode {
  margin-top: 30px;
  color: #7f8c8d;
}
.toggle-mode a {
  color: #42b983;
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
