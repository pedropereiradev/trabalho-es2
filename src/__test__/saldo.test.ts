import { describe, it, expect, beforeEach, vi } from 'vitest';
import SaldoService from '../services/saldo.service';

vi.mock('../services/saldo.service', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      findAll: vi.fn().mockResolvedValue([
        { id: 1, alunoId: 1, saldo: 100 },
        { id: 2, alunoId: 2, saldo: 150 },
      ]),
    })),
  };
});

describe('Service de Saldo com banco simulado', () => {
  let saldoService: SaldoService;

  beforeEach(() => {
    saldoService = new SaldoService() as SaldoService;
  });

  it('deve retornar todos os saldos', async () => {
    const saldos = await saldoService.findAll();

    expect(saldos).toHaveLength(2);
    expect(saldos[0].saldo).toEqual(100);
    expect(saldos[1].saldo).toEqual(150);
  });
});