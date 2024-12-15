const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criação do servidor Express
const app = express();
const port = 3000;

// Rota para pesquisa de lotes por descrição
app.get('/search', async (req, res) => {
    const searchTerm = req.query.term || '';  // Obtém o parâmetro da URL

    try {
        // Usando Prisma para realizar a consulta
        const lotes = await prisma.lotes.findMany({
            where: {
                descricao: {
                    contains: searchTerm,  // Realiza a busca com o termo
                    mode: 'insensitive',  // Ignora maiúsculas/minúsculas
                }
            }
        });

        res.json(lotes);  // Retorna os resultados como JSON
    } catch (err) {
        console.error('Erro na consulta com Prisma:', err);
        return res.status(500).send('Erro na consulta');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
