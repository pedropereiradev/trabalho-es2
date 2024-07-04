// Controller para a rota /gastos feito por PEDRO

import { Router } from 'express';
import GastoService from '../services/gastos.service';
import CustomError from '../utils/customError';

const router = Router();
const gastoService = new GastoService();

router.get('/', async (req, res) => {
  try {
    const response = await gastoService.findAll();

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
    const response = await gastoService.create(req.body);
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await gastoService.delete(id);

    res.status(200).json('Gasto deletado com sucesso');
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
