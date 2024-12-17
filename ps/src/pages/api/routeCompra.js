import mysql from 'mysql2';
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

export const config = {
  api: { bodyParser: false },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/assets/Lotes'),
      keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields) => {
        if (err) {
          console.error('Erro ao fazer o upload:', err);
          return res.status(500).json({ error: 'Erro no upload do lote' });
        }

        //console.log('Campos recebidos:', fields);

        try {
          const { usuario, lote, data_compra } = fields;

          console.log('Comprador:', usuario);
          console.log('Anunciante (Lote):', lote);
          console.log('Data da compra:', data_compra);

          console.log('Preparando para salvar no banco de dados...');

          // Obtém uma conexão da pool
          const connection = await db.promise().getConnection();

          try {
            // Inicia a transação
            await connection.beginTransaction();

            // Salva na tabela 'compras'
            const [result] = await connection.query(
              'INSERT INTO compras (usuario, lote, data_compra) VALUES (?, ?, ?)',
              [usuario, lote, data_compra]
            );

            console.log('Compra registrada com ID:', result.insertId);

            // Confirma as alterações
            await connection.commit();

            // Envia a resposta de sucesso
            return res.status(201).json({ message: 'Compra registrada com sucesso!', userId: result.insertId });
          } catch (dbErr) {
            // Em caso de erro, desfaz todas as alterações feitas
            await connection.rollback();
            console.error('Erro ao registrar no banco de dados:', dbErr);
            return res.status(500).json({ error: 'Erro ao registrar no banco' });
          } finally {
            // Libera a conexão
            connection.release();
          }
        } catch (err) {
          console.error('Erro ao obter conexão:', err);
          return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
        }
      });
    });
  } 

  return res.status(405).json({ error: 'Método não permitido' });
};

export default handler;
