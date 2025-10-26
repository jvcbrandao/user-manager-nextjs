const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // --- ADMIN FIXO ---
  const adminData = {
    name: 'Admin Master',
    email: 'admin@example.com',
    password: await bcrypt.hash('Admin@123', 10),
    cep: '01001-000',
    state: 'SP',
    city: 'São Paulo',
    role: 'ADMIN',
  }

  // --- NOMES E CIDADES BASE ---
  const firstNames = ['Carlos', 'Mariana', 'Pedro', 'Aline', 'Rafael', 'Julia', 'Lucas', 'Fernanda', 'Diego', 'Beatriz', 'Gustavo', 'Larissa', 'Thiago', 'Camila', 'João', 'Patrícia']
  const lastNames = ['Silva', 'Souza', 'Oliveira', 'Pereira', 'Costa', 'Santos', 'Lima', 'Gomes', 'Barros', 'Almeida', 'Ribeiro', 'Cardoso']
  const states = [
    { state: 'SP', city: 'São Paulo', cep: '01001-000' },
    { state: 'RJ', city: 'Rio de Janeiro', cep: '20000-000' },
    { state: 'MG', city: 'Belo Horizonte', cep: '30100-000' },
    { state: 'BA', city: 'Salvador', cep: '40000-000' },
    { state: 'RS', city: 'Porto Alegre', cep: '90000-000' },
    { state: 'PR', city: 'Curitiba', cep: '80000-000' },
    { state: 'CE', city: 'Fortaleza', cep: '60000-000' },
    { state: 'DF', city: 'Brasília', cep: '70000-000' },
  ]

  // --- GERADOR DE USUÁRIOS ---
  const randomUsers = Array.from({ length: 30 }).map((_, i) => {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)]
    const last = lastNames[Math.floor(Math.random() * lastNames.length)]
    const loc = states[Math.floor(Math.random() * states.length)]
    const email = `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`
    const password = 'Senha123'

    return {
      name: `${first} ${last}`,
      email,
      password,
      cep: loc.cep,
      state: loc.state,
      city: loc.city,
      role: 'USER',
    }
  })

  // --- LIMPA TABELA (somente em dev!) ---
  await prisma.user.deleteMany()
  console.log('🧹 Tabela User limpa.')

  // --- CRIA ADMIN ---
  await prisma.user.create({ data: adminData })
  console.log(`👑 Admin criado: ${adminData.email}`)

  // --- CRIA USUÁRIOS COM SENHA HASHED ---
  for (const user of randomUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    await prisma.user.create({
      data: { ...user, password: hashedPassword },
    })
  }

  console.log(`✅ ${randomUsers.length} usuários criados com sucesso.`)
  console.log('🌾 Seed concluído!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
