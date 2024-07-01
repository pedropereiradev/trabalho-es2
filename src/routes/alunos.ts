import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();

    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const { nome, turma, observacao, nomeResponsavel, telResponsavel } = req.body;

  if (!nome || !turma || !nomeResponsavel || !telResponsavel) {
    res
      .status(400)
      .json({ erro: 'Informe nome, turma, nome do responsavel, telefone' });
    return;
  }

  try {
    const aluno = await prisma.aluno.create({
      data: { nome, turma, observacao, nomeResponsavel, telResponsavel },
    });

    res.status(201).json(aluno);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
