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

// Conecta ao banco
db.getConnection()
  .then(() => console.log('Conexão bem-sucedida ao banco de dados!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

  const handler = async (req, res) => {
    if (req.method === 'GET') {
      const { ids } = req.query; // Obtém os IDs da query string
  
      try {
        if (!ids) {
          return res.status(400).json({ error: 'IDs não fornecidos' });
        }
  
        const parsedIds = JSON.parse(ids); // Converte a string para um array de IDs
        const [rows] = await db.query('SELECT * FROM lotes WHERE id IN (?)', [parsedIds]);
  
        if (rows.length === 0) {
          return res.status(404).json({ error: 'Lotes não encontrados' });
        }
  
        return res.status(200).json(rows); // Retorna os lotes encontrados
      } catch (dbErr) {
        console.error('Erro ao buscar os lotes:', dbErr);
        return res.status(500).json({ error: 'Erro ao buscar os lotes' });
      }
    } else {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  };
  
  

export default handler;
