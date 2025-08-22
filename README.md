# Cadastro de Livros - Frontend

Este é o **frontend** do sistema de Cadastro de Livros, desenvolvido em **Vue 3 com TypeScript**, que consome uma API backend e utiliza o **Supabase** para autenticação.

## Tecnologias Utilizadas

- **Vue 3** → Framework principal para construção da interface.
- **TypeScript** → Tipagem estática para maior segurança no desenvolvimento.
- **Vue Router** → Gerenciamento de rotas e navegação entre páginas.
- **Axios** → Consumo da API backend.
- **Supabase** → Autenticação de usuários e gerenciamento de sessão.
- **ESLint + Prettier** → Padronização e qualidade de código.

## Autenticação

- O projeto utiliza o **Supabase Auth** para login e gerenciamento de sessão.
- As requisições HTTP feitas pelo Axios incluem automaticamente o **token JWT** do usuário autenticado.

## Estrutura do Projeto

Abaixo está a estrutura de pastas e arquivos do projeto:

```
cadastro-livros-frontend/
├── src/
│   ├── assets/                # Arquivos estáticos (imagens, ícones, etc.)
│   ├── components/            # Componentes Vue reutilizáveis
│   │   ├── BooksManager.vue   # Gerenciamento de livros (CRUD)
│   ├── composables/           # Funções reutilizáveis (ex.: autenticação)
│   │   ├── useAuth.ts         # Lógica de autenticação com Supabase
│   ├── lib/                   # Configurações externas
│   │   ├── supabaseClient.ts  # Cliente Supabase configurado
│   ├── views/                 # Páginas principais
│   │   ├── HomeView.vue       # Página inicial com lista de livros
│   ├── types/                 # Tipos TypeScript usados no projeto
│   ├── env.d.ts               # Configuração de variáveis de ambiente
│   ├── App.vue                # Componente raiz do Vue
│   ├── main.ts                # Arquivo principal para inicialização do Vue
├── public/                    # Arquivos públicos (ex.: index.html)
├── README.md                  # Documentação do projeto
├── package.json               # Dependências e scripts do projeto
├── tsconfig.json              # Configuração do TypeScript
├── tsconfig.app.json          # Configuração específica para o aplicativo
├── vite.config.ts             # Configuração do Vite
```

## Configuração do Projeto

### Instalar Dependências

```sh
npm install
```

### Executar em Ambiente de Desenvolvimento

```sh
npm run dev
```

### Gerar Build para Produção

```sh
npm run build
```

### Verificar e Corrigir Código com ESLint

```sh
npm run lint
```

## Funcionalidades

- **Autenticação**: Login e cadastro de usuários com Supabase.
- **Gerenciamento de Livros**: Adicionar, editar, listar e excluir livros.
- **Interface Responsiva**: Adaptada para diferentes tamanhos de tela.

## Screenshots da Aplicação

### Tela de Login

![Login](login.png)

### Tela de Cadastro

![Criar Conta](criar_conta.png)

### Tela Inicial

![Home](home.png)

### Modal de Adicionar Livros

![Criar Livros](criar_livros.png)
