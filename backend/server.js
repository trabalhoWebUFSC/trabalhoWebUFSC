require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('./models/User'); 

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json()); 

// === Conexão com MongoDB Atlas ===
// Esta é a linha que VAI TESTAR sua conexão
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas! DEU CERTO!"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));


// ROTA DE CADASTRO (Register) 
app.post('/api/register', async (req, res) => {
  try {
    const { name, birth, email, password, address } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      birth: birth,
      email: email,
      password: passwordHash, 
      address: address
    });

    await newUser.save();
    res.status(201).json({ message: "Usuário criado com sucesso!" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});


// ROTA DE LOGIN (Login) 

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    res.json({ token, message: "Login bem-sucedido!" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor do backend rodando em http://localhost:${PORT}`);
});