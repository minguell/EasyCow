import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLotes() {
  try {
    console.log('Consultando lotes no banco...');
    const lotes = await prisma.lote.findMany();
    console.log('Lotes encontrados:', lotes);
    return lotes;
  } catch (error) {
    console.error('Erro ao buscar lotes:', error);
    return [];
  }
}
