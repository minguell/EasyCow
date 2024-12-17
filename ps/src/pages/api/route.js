import mysql from 'mysql2/promise';
import { IncomingForm } from 'formidable';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configura o MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection()
  .then(() => console.log('Conexão bem-sucedida ao banco de dados!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Desativa o parsing automático de corpo (necessário para `formidable`)
export const config = {
  api: { bodyParser: false },
};

const handler = async (req, res) => {  // Adicione 'res' como parâmetro
  if (req.method === 'POST') {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/assets/Usuarios'),
      keepExtensions: true
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Erro ao fazer o upload:', err);
          return res.status(500).json({ error: 'Erro no upload' }); // Usar res para responder
        }

        console.log('Campos recebidos:', fields);
        console.log('Arquivos recebidos:', files);

        try {
          const { username, email, date, password } = fields;
          const filePath = files.image && files.image[0]?.filepath ? '/assets/Usuarios/' + path.basename(files.image[0].filepath) : null;

          if (!filePath) {
            console.error('Erro: Nenhuma imagem enviada');
            return res.status(400).json({ error: 'Nenhuma imagem enviada' }); // Usar res para responder
          }

          console.log('Preparando para salvar no banco de dados...');

          // Salva no banco de dados
          const [result] = await db.query(
            'INSERT INTO usuarios (nome, email, data_nascimento, senha, foto) VALUES (?, ?, ?, ?, ?)',
            [username, email, date, password, filePath]
          );

          console.log('Usuário registrado com ID:', result.insertId);

          return res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: result.insertId });  // Usar res para responder
        } catch (dbErr) {
          console.error('Erro ao registrar no banco de dados:', dbErr);
          return res.status(500).json({ error: 'Erro ao registrar no banco' }); // Usar res para responder
        }
      });
    });
  }

  return res.status(405).json({ error: 'Método não permitido' }); // Usar res para responder
};

export default handler;
