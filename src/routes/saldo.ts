import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient().$extends({
  result: {
    aluno: {
      saldo: {
        needs: { totalCompras: true, totalDepositos: true },
        compute({ totalCompras, totalDepositos }) {
          return totalDepositos - totalCompras;
        },
      },
    },
  },
});
const router = Router();

router.get('/', async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      select: {
        id: true,
        nome: true,
        totalCompras: true,
        numCompras: true,
        saldo: true,
      },
    });

    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
