# Desafio HappMobi - Sistema de Reserva de Veículos

Sistema completo de gerenciamento e reserva de veículos desenvolvido com NestJS e Angular.

## 📋 Sobre o Projeto
Este projeto é um sistema full-stack que permite aos usuários visualizar, reservar e gerenciar veículos. Possui autenticação JWT, upload de imagens via Cloudinary e uma interface responsiva.

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **Prisma** - ORM para MongoDB
- **MongoDB** - Banco de dados NoSQL
- **JWT** - Autenticação
- **Cloudinary** - Armazenamento de imagens
- **Bcrypt** - Criptografia de senhas

### Frontend
- **Angular 18** - Framework JavaScript
- **TypeScript** - Linguagem de programação
- **SCSS** - Estilização

## 🔧 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta MongoDB Atlas (ou MongoDB local)
- Conta Cloudinary (para upload de imagens)

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd desafio-happmobi
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` baseado no `.env.example`:

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/banco_de_dados?appName=nome_da_aplicacao"

JWT_SECRET="sua-chave-secreta-jwt-mude-isso-em-producao"

CLOUDINARY_CLOUD_NAME="seu-nome-da-nuvem"
CLOUDINARY_API_KEY="sua-chave-api"
CLOUDINARY_API_SECRET="seu-secret-api"

ADMIN_EMAIL="admin@exemplo.com.br"
ADMIN_PASSWORD="sua-senha-segura"
```

Execute as migrações do Prisma:

```bash
npx prisma generate
npx prisma db push
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

## 🎯 Executando o Projeto

### Backend

```bash
cd backend

# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod
```

O servidor estará disponível em `http://localhost:3000`

### Frontend

```bash
cd frontend

# Modo desenvolvimento
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## � Documentação da API

A API REST está completamente documentada com **Swagger/OpenAPI**. Após iniciar o servidor backend, acesse a documentação interativa em:

```
http://localhost:3000/docs
```

## �📚 Funcionalidades

### Usuários
- ✅ Cadastro e autenticação
- ✅ Perfil com foto
- ✅ Gerenciamento de conta

### Veículos
- ✅ Listagem de veículos
- ✅ Cadastro (admin)
- ✅ Atualização (admin)
- ✅ Filtros por tipo de carroceria, motor, assentos

### Reservas
- ✅ Criação de reservas
- ✅ Listagem de reservas
- ✅ Finalização de reservas
- ✅ Histórico de reservas
