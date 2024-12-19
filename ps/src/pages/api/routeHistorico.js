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
  if (req.method === 'GET') {
    try {
      const { usuario } = req.query; // Obtém o valor de 'usuario' dos parâmetros de consulta

      if (!usuario) {
        return res.status(400).json({ error: 'Usuário não fornecido' });
      }

      console.log('Usuário:', usuario);

      // Realiza a consulta no banco de dados para buscar as informações da compra do usuário
      const [rows] = await db.query(
        'SELECT id, usuario, lote, data_compra FROM compras WHERE usuario = ?',
        [usuario]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Compra não encontrada para este usuário' });
      }

      console.log('Compra encontrada:', rows);

      return res.status(200).json(rows); // Retorna os dados encontrados
    } catch (dbErr) {
      console.error('Erro ao buscar no banco de dados:', dbErr);
      return res.status(500).json({ error: 'Erro ao buscar dados no banco' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
};

export default handler;
