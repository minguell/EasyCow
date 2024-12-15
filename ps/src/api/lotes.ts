import { NextApiRequest, NextApiResponse } from 'next';
import { getLotes } from '../services/loteService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { term } = req.query;

    // Chama a função getLotes para obter todos os lotes
    let lotes = await getLotes();

    // Se houver um termo de pesquisa, filtra os lotes pela descrição
    if (term) {
      if (typeof term === 'string') {
        lotes = lotes.filter((lote) =>
          lote.descricao.toLowerCase().includes(term.toLowerCase())
        );
      }
    }

    // Retorna os lotes encontrados
    res.status(200).json(lotes);
  } catch (err) {
    console.error('Erro na API de lotes:', err);
    res.status(500).json({ error: 'Erro ao carregar lotes.' });
  }
}
