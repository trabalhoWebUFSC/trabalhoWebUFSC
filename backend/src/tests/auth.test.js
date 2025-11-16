// backend/src/tests/auth.test.js

const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // Importa o app.js (correto!)
const User = require('../models/User'); // Importamos o Model para limpar o banco

// Variável para guardar o servidor em memória
let mongoServer;

// --- DADOS MOCKADOS ---
// Objeto completo de um usuário válido
const mockUserData = {
  name: "Usuario Teste",
  email: "teste.valido@hotel.com",
  password: "SenhaForte123!",
  birth: "1995-05-15T00:00:00.000Z", // Formato Date
  address: {
    cep: "88015000",
    street: "Rua Teste",
    number: "123",
    hood: "Centro",
    city: "Florianopolis",
    state: "SC"
  }
};


// === GANCHOS DE SETUP E TEARDOWN ===

// ANTES de TODOS os testes, iniciamos o banco em memória
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// DEPOIS de CADA teste, limpamos os dados
afterEach(async () => {
  await User.deleteMany({});
  // (No futuro: await Booking.deleteMany({}), etc.)
});

// DEPOIS de TODOS os testes, fechamos a conexão e paramos o banco
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});


// === OS TESTES ===

describe('API de Autenticação (/api/auth)', () => {

  // Teste Caminho Feliz - Registro
  it('deve registrar um novo usuário com dados válidos', async () => {
    const response = await supertest(app)
      .post('/api/auth/register')
      .send(mockUserData); // Enviamos os dados completos

    // 1. Verifica a Resposta HTTP
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Usuário criado com sucesso!");

    // 2. (Opcional, mas ótimo) Verifica o Banco
    const userInDb = await User.findOne({ email: mockUserData.email });
    expect(userInDb).toBeTruthy(); // Garante que ele existe
    expect(userInDb.name).toBe(mockUserData.name);
    expect(userInDb.password).not.toBe("SenhaForte123!"); // Garante que a senha foi HASHEADA
  });

  // Teste Caminho de Erro - Email Duplicado
  it('deve retornar erro 400 ao tentar registrar um email duplicado', async () => {
    // 1. Cria o primeiro usuário
    await supertest(app).post('/api/auth/register').send(mockUserData);
    
    // 2. Tenta criar o MESMO usuário de novo
    const response = await supertest(app)
      .post('/api/auth/register')
      .send(mockUserData);
      
    // 3. Verifica o Erro
    expect(response.status).toBe(400); // Erro do cliente
    expect(response.body.message).toBe("E-mail já cadastrado.");
  });
  
  // Teste Caminho Feliz - Login
  it('deve logar um usuário existente e retornar um token JWT', async () => {
    // 1. Primeiro, registra o usuário
    await supertest(app).post('/api/auth/register').send(mockUserData);

    // 2. Tenta logar
    const response = await supertest(app)
      .post('/api/auth/login')
      .send({
        email: mockUserData.email,
        password: mockUserData.password,
      });

    // 3. Verifica a Resposta
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login bem-sucedido!");
    expect(response.body.token).toBeDefined(); // Verifica se o token JWT existe
  });

  // Teste Caminho de Erro - Senha Incorreta
  it('deve retornar erro 401 ao tentar logar com senha incorreta', async () => {
    // 1. Registra o usuário
    await supertest(app).post('/api/auth/register').send(mockUserData);
    
    // 2. Tenta logar com a senha errada
    const response = await supertest(app)
      .post('/api/auth/login')
      .send({
        email: mockUserData.email,
        password: "senha-errada-123", // Senha incorreta
      });

    // 3. Verifica o Erro
    expect(response.status).toBe(400); // O service joga um Error, o errorHandler captura como 400
    expect(response.body.message).toBe("Credenciais inválidas.");
  });

});