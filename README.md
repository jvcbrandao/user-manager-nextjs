# User Manager

Aplicação **Next.js + Prisma + NextAuth** para gerenciamento de usuários com autenticação e painel administrativo.

---

## 🚀 Tecnologias Utilizadas
- **Next.js 15**
- **React 19**
- **Prisma ORM**
- **SQLite**
- **NextAuth**
- **Tailwind CSS**
- **BcryptJS**

---

## 📂 Estrutura do Projeto

```
app/
 ├── (auth)/
 │   ├── login/page.tsx
 │   └── register/page.tsx
 ├── api/
 │   ├── auth/[...nextauth]/route.ts
 │   └── users/
 │       ├── [id]/route.ts
 │       └── route.ts
 ├── components/ui/
 │   ├── LoginForm.tsx
 │   └── LogoutButton.tsx
 ├── dashboard/
 │   ├── admin/page.tsx
 │   └── page.tsx
 ├── lib/prisma.ts
 ├── styles/globals.css
 ├── layout.tsx
 ├── page.tsx
 └── providers.tsx

prisma/
 ├── migrations/
 ├── schema.prisma
 └── seed.js

.env
package.json
middleware.ts
next.config.ts
```

---

## ⚙️ Instalação e Execução

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/jvcbrandao/user-manager.git
cd user-manager
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo **.env** na raiz com o seguinte conteúdo:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="uma_chave_segura_aqui"
NEXTAUTH_URL="http://localhost:3000"
```

> Dica: você pode gerar uma chave secreta executando:
> ```bash
> openssl rand -base64 32
> ```

### 4️⃣ Executar migrações do Prisma

```bash
npx prisma migrate dev
```

### 5️⃣ Rodar o seed (popular o banco)

```bash
npm run seed
```

✅ Isso criará um usuário admin fixo:

```
Email: admin@example.com
Senha: Admin@123
```

E também criará **30 usuários de exemplo** com papéis `USER`.

### 6️⃣ Rodar o projeto em modo desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🔑 Login

| Tipo de usuário | Email | Senha |
|------------------|--------|--------|
| **Administrador** | admin@example.com | Admin@123 |
| **Usuário comum** | Ex.: rafael.cardoso0@example.com | Senha123 |

---

## 🗂 Banco de Dados

O banco usa **SQLite** (arquivo `prisma/dev.db`), ideal para ambiente local.

Você pode visualizar com:

```bash
npx prisma studio
```

> Isso abrirá o painel do Prisma em `http://localhost:5555`.

---

## 🧩 Estrutura Prisma

### `schema.prisma`

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  cep       String?
  state     String?
  city      String?
  role      String   @default("USER")
}
```

---

## 💬 Scripts Disponíveis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Executa o servidor em modo desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm start` | Inicia o servidor em produção |
| `npm run seed` | Popula o banco com dados de exemplo |

---

## 🧱 Estrutura de Autenticação

A autenticação é feita com **NextAuth**, utilizando **credentials provider** e verificação de senha com **bcryptjs**.

Sessões são armazenadas em JWT, e o papel do usuário (`role`) é injetado na sessão para controle de permissões (ex: dashboard/admin).

---

## 🧩 Middleware

O arquivo `middleware.ts` protege rotas como `/dashboard` e `/dashboard/admin`, redirecionando usuários não autenticados para o login.

---

## 🧰 Requisitos

- Node.js **>= 18**
- NPM **>= 9**
- SQLite incluído (não requer instalação extra)

---

## 👨‍💻 Autor

Desenvolvido por **[João Vitor Brandão]**  
📧 Email: [jvcbrandaomat@gmail.com]  
🌐 GitHub: [https://github.com/jvcbrandao](https://github.com/jvcbrandao)

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.
