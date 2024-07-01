import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  try {
    const gastos = await prisma.gasto.findMany({
      include: {
        aluno: true,
      },
    });

    res.status(200).json(gastos);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const { descricao, alunoId, lanche, valorLanche } = req.body;

  if (!alunoId || !descricao || !lanche || !valorLanche) {
    res.status(400).json({
      erro: 'Informe valor, data, id do aluno, descrição, lanche e valor do lanche',
    });
    return;
  }

  try {
    const [gasto, aluno] = await prisma.$transaction([
      prisma.gasto.create({
        data: { descricao, alunoId, lanche, valorLanche },
      }),
      prisma.aluno.update({
        where: { id: alunoId },
        data: {
          totalCompras: { increment: Number(valorLanche) },
          numCompras: { increment: 1 },
        },
      }),
    ]);

    res.status(201).json({ gasto, aluno });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const gasto = await prisma.gasto.findUnique({
      where: { id: Number(id) },
    });

    if (!gasto) {
      res.status(404).json({ erro: 'Gasto não encontrado' });
      return;
    }

    prisma.$transaction([
      prisma.gasto.delete({
        where: { id: Number(id) },
      }),
      prisma.aluno.update({
        where: { id: gasto.alunoId },
        data: {
          totalCompras: { decrement: gasto.valorLanche },
          numCompras: { decrement: 1 },
        },
      }),
    ]);

    res.status(200).json('Gasto deletado com sucesso');
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
