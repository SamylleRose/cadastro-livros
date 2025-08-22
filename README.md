# Cadastro de Livros - Frontend  

Este é o **frontend** do sistema de Cadastro de Livros, desenvolvido em **Vue 3 com TypeScript**, que consome uma API backend e utiliza o **Supabase** para autenticação.  

## Tecnologias Utilizadas  

- **Vue 3** → framework principal para construção da interface  
- **TypeScript** → tipagem estática para maior segurança no desenvolvimento  
- **Vue Router** → gerenciamento de rotas e navegação entre páginas  
- **Axios** → consumo da API backend  
- **Supabase** → autenticação de usuários e gerenciamento de sessão  
- **ESLint + Prettier** → padronização e qualidade de código  

## Autenticação  

- O projeto utiliza o **Supabase Auth** para login e gerenciamento de sessão.  
- As requisições HTTP feitas pelo Axios incluem automaticamente o **token JWT** do usuário autenticado.  

## Integração com Backend  
[Repósitorio backend](https://github.com/anny-nl/SD-Projeto_livros)

- O frontend consome uma API hospedada em `http://localhost:3000` (ou outra definida no arquivo `.env`).  
- Todas as operações (cadastro, listagem, etc.) passam pela camada de autenticação.  


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```



### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## SEGUE O LINK DO VÍDEO
-
