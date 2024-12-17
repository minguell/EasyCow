const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota para cadastrar usuário
app.post('/api/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

  db.query(query, [nome, email, senha], (err, results) => {
    if (err) {
      res.status(500).json({ mensagem: 'Erro ao cadastrar usuário', erro: err });
    } else {
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    }
  });
});

// Rota para buscar informações do usuário pelo nome
app.get('/api/usuario', (req, res) => {
  const { nome } = req.query;

  if (!nome) {
    return res.status(400).json({ mensagem: 'Nome não fornecido.' });
  }

  const query = 'SELECT nome, data_nascimento, email, saldo, foto FROM usuarios WHERE nome = ?';

  db.query(query, [nome], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados do usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar dados do usuário.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.json(results[0]);
  });
});

// Rota para buscar informações de um gift card pelo código
app.get('/api/giftcard', (req, res) => {
  const { codigo } = req.query;

  if (!codigo) {
    return res.status(400).json({ mensagem: 'Código do gift card não fornecido.' });
  }

  const query = 'SELECT codigo, valor, usado FROM gift_cards WHERE codigo = ?';

  db.query(query, [codigo], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados do gift card:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar dados do gift card.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensagem: 'Gift card não encontrado.' });
    }

    res.json(results[0]); // Retorna o gift card encontrado
  });
});



// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
