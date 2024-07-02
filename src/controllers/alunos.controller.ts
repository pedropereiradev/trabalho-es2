import { Router } from 'express';
import AlunoService from '../services/alunos.service';
import CustomError from '../utils/customError';

const router = Router();
const alunoService = new AlunoService();

router.get('/', async (req, res) => {
  try {
    const response = await alunoService.findAll();

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error.message);
      res.status(error.status).send({ error: error.message });
    } else {
      console.error('An unexpected error occurred');
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
});

router.post('/', async (req, res) => {
  try {
    const response = await alunoService.create(req.body);

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error.message);
      res.status(error.status).send({ error: error.message });
    } else {
      console.error('An unexpected error occurred');
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
});

export default router;