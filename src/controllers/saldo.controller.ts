import { Router } from 'express';
import SaldoService from '../services/saldo.service';
import CustomError from '../utils/customError';

const router = Router();
const saldoService = new SaldoService();

router.get('/', async (req, res) => {
  try {
    const alunos = await saldoService.findAll();

    res.status(200).json(alunos);
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

