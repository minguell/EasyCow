import mysql from 'mysql2/promise';
import { IncomingForm } from 'formidable';
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

// Desativa o parsing automático de corpo (necessário para `formidable`)
export const config = {
  api: { bodyParser: false },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    
    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields) => {
        if (err) {
          console.error('Erro ao fazer o upload:', err);
          return res.status(500).json({ error: 'Erro no upload' });
        }

        console.log('Campos recebidos:', fields);

        try {
          const { pesquisa } = fields;

          const query = `SELECT * FROM lotes WHERE anunciante LIKE ? OR cidade LIKE ? OR descricao LIKE ?`;
          const valores = ['%' + pesquisa + '%', '%' + pesquisa + '%', '%' + pesquisa + '%'];


          // Verificar se o usuário existe no banco de dados
          const [rows] = await db.query(query, valores);
          

          if (rows.length === 0) {
            return res.status(401).json({ error: 'valor invalido' });
          }

          console.log('termo pesquisado:', pesquisa);
          return res.status(200).json(rows);
        } catch (dbErr) {
          console.error('Erro ao verificar login:', dbErr);
          return res.status(500).json({ error: 'Erro ao processar a pesquisa' });
        }
      });
    });
  }

  return res.status(405).json({ error: 'Método não permitido' });
};

export default handler;
