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
          const { username, password } = fields;

          if (!username || !password) {
            return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
          }

          // Verificar se o usuário existe no banco de dados
          const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE nome = ? AND senha = ?',
            [username, password]
          );

          if (rows.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
          }

          console.log('Usuário autenticado:', username);
          return res.status(200).json({ message: 'Login realizado com sucesso!' });
        } catch (dbErr) {
          console.error('Erro ao verificar login:', dbErr);
          return res.status(500).json({ error: 'Erro ao processar o login' });
        }
      });
    });
  }

  return res.status(405).json({ error: 'Método não permitido' });
};

export default handler;
