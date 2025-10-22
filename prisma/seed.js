// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Usuários a serem criados
  const usersData = [
    {
      name: 'Admin Master',
      email: 'admin@example.com',
      password: 'Admin@123',
      cep: '01001-000',
      state: 'SP',
      city: 'São Paulo',
      role: 'ADMIN',
    },
    {
      name: 'Carlos Souza',
      email: 'carlos@example.com',
      password: 'Senha123',
      cep: '20000-000',
      state: 'RJ',
      city: 'Rio de Janeiro',
    },
    {
      name: 'Mariana Lima',
      email: 'mariana@example.com',
      password: 'Senha123',
      cep: '30100-000',
      state: 'MG',
      city: 'Belo Horizonte',
    },
    {
      name: 'Pedro Santos',
      email: 'pedro@example.com',
      password: 'Senha123',
      cep: '40000-000',
      state: 'BA',
      city: 'Salvador',
    },
    {
      name: 'Aline Pereira',
      email: 'aline@example.com',
      password: 'Senha123',
      cep: '60000-000',
      state: 'CE',
      city: 'Fortaleza',
    },
    {
      name: 'Rafael Costa',
      email: 'rafael@example.com',
      password: 'Senha123',
      cep: '70000-000',
      state: 'DF',
      city: 'Brasília',
    },
  ];

  // Remove todos os usuários antes (opcional em dev)
  await prisma.user.deleteMany();
  console.log('Tabela User limpa.');

  // Cria os usuários com senha hasheada
  for (const user of usersData) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        cep: user.cep,
        state: user.state,
        city: user.city,
        role: user.role || 'USER',
      },
    });
    console.log(`Usuário criado: ${user.email}`);
  }

  console.log('✅ Seed concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
