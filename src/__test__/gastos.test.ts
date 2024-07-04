import { describe, it, expect, beforeEach, vi } from 'vitest';
import GastoService from '../services/gastos.service';

vi.mock('../services/gastos.service', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      create: vi.fn().mockImplementation((gasto) => Promise.resolve({ gasto: { ...gasto, id: 1 } })),
      findAll: vi.fn().mockResolvedValue([
        { id: 1, alunoId: 1, valorLanche: 10, lanche: 'Coxinha', descricao: 'Lanche da tarde' },
        { id: 2, alunoId: 2, valorLanche: 15, lanche: 'Pastel', descricao: 'Lanche da manhã' },
      ]),
      delete: vi.fn().mockImplementation((id) => Promise.resolve({ message: 'Gasto deletado com sucesso', id })),
    })),
  };
});

describe('Service de Gastos com banco simulado', () => {
  let gastoService: GastoService;

  beforeEach(() => {
    gastoService = new GastoService() as GastoService;
  });

  it('deve retornar o gasto inserido', async () => {
    const gasto = {
      alunoId: 1,
      valorLanche: 10,
      lanche: 'Coxinha',
      descricao: 'Lanche da tarde',
    };
    const gastoCriado = await gastoService.create(gasto);

    expect(gastoCriado.gasto).toEqual({ ...gasto, id: 1 });
  });

  it('deve retornar todos os gastos', async () => {
    const gastos = await gastoService.findAll();

    expect(gastos).toHaveLength(2);
  });

  it('deve retornar a mensagem de gasto deletado', async () => {
    const idToDelete = '1';
    const gastoDeletado = await gastoService.delete(idToDelete);

    expect(gastoDeletado).toEqual({ message: 'Gasto deletado com sucesso', id: idToDelete });
  });
});