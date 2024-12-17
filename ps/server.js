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

// rota para atualizar o saldo do usuário
app.post('/api/atualizar-saldo', (req, res) => {
  const { nome, valor } = req.body;

  if (!nome || !valor) {
    return res.status(400).json({ mensagem: 'Nome e valor são obrigatórios.' });
  }

  const query = 'UPDATE usuarios SET saldo = saldo + ? WHERE nome = ?';

  db.query(query, [valor, nome], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar saldo:', err);
      return res.status(500).json({ mensagem: 'Erro ao atualizar saldo.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.json({ mensagem: 'Saldo atualizado com sucesso!' });
  });
});

// Rota para atualizar o gift card
app.post('/api/atualizar-codigo', (req, res) => {
  const { codigo, usado } = req.body;

  // Atualize o status do código no banco de dados para 'usado'
  const query = 'UPDATE gift_cards SET usado = ? WHERE codigo = ?';
  db.query(query, [usado, codigo], (err, result) => {
    if (err) {
      res.status(500).json({ mensagem: 'Erro ao atualizar o código.' });
    } else {
      res.status(200).json({ mensagem: 'Código atualizado com sucesso.' });
    }
  });
});

// Rota para atualizar a disponibilidade do lote
app.post('/api/atualizar-disponibilidade', (req, res) => {
  const { id, disponivel } = req.body;
  console.log(req.body); // Log do corpo recebido

  // Atualize o status do código no banco de dados para 'usado'
  const query = 'UPDATE lotes SET disponivel = ? WHERE id = ?';
  db.query(query, [disponivel, id], (err, result) => {
    if (err) {
      res.status(500).json({ mensagem: 'Erro ao atualizar disponibilidade.' });
    } else {
      res.status(200).json({ mensagem: 'Disponibilidade atualizada com sucesso.' });
    }
  });
});


// Rota para cadastrar lote
app.post('/api/lotes', (req, res) => {
  const { nome, cidade, descrição, preço } = req.body;


  const query = 'INSERT INTO lotes (anunciante, cidade, valor, descricao) VALUES (?, ?, ?, ?)';
  
  db.query(query, [nome, cidade, preço, descrição], (err, results) => {
    if (err) {
      res.status(500).json({ mensagem: 'Erro ao registrar lote', erro: err });
    } else {
      res.status(201).json({ mensagem: 'Lote registrado com sucesso!', userId: results.insertId });
    }
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

app.post('/api/comprar', (req, res) => {
  const { usuario, anunciante, data_compra} = req.query;

  const query = 'INSERT INTO compras (usuario, anunciante, data_compra) VALUES (?, ?, ?)';
  
  db.query(query, [usuario, anunciante, data_compra], (err, results) => {
    if (err) {
      res.status(500).json({ mensagem: 'Erro ao registrar compra', erro: err });
    } else {
      res.status(201).json({ mensagem: 'Compra registrada com sucesso!', userId: results.insertId });
    }
  });
});


// Inicia o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});