import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configura o MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const config = {
  api: { bodyParser: true }, // Habilita o body parser para processar JSON ou dados de formulário
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { usuario, lote, data_compra } = req.body; // Obtém os campos do corpo da requisição

      console.log('Comprador:', usuario);
      console.log('Lote:', lote);
      console.log('Data da compra:', data_compra);

      // Conecta ao banco de dados e realiza a inserção
      const [result] = await db.query(
        'INSERT INTO compras (usuario, lote, data_compra) VALUES (?, ?, ?)',
        [usuario, lote, data_compra]
      );

      console.log('Compra registrada com ID:', result.insertId);

      return res.status(201).json({ message: 'Compra registrada com sucesso!', userId: result.insertId });
    } catch (dbErr) {
      console.error('Erro ao registrar no banco de dados:', dbErr);
      return res.status(500).json({ error: 'Erro ao registrar no banco' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
};

export default handler;
