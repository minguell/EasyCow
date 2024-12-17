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
      uploadDir: path.join(process.cwd(), 'public/assets/Lotes'),
      keepExtensions: true
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields) => {
        if (err) {
          console.error('Erro ao fazer o upload:', err);
          return res.status(500).json({ error: 'Erro no upload do lote' }); // Usar res para responder
        }

        console.log('Campos recebidos:', fields);

        try {
          const {usuario, lote, data_compra } = fields;

          console.log('Comprador:', usuario);
          console.log('ID:', lote);
          console.log('Data da compra:', data_compra);

          console.log('Preparando para salvar no banco de dados...');

          // Salva no banco de dados
          const [result] = await db.query(
            'INSERT INTO compras (usuario, lote, data_compra) VALUES (?, ?, ?)',
            [usuario, lote, data_compra]
          );
          console.log('Resultado da query:', result);
          

          console.log('Compra registrada com ID:', result.insertId);

          return res.status(201).json({ message: 'Compra registrada com sucesso!', userId: result.insertId });  // Usar res para responder
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
