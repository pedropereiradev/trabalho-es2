import { expect, it } from 'vitest';
import GastoService from '../services/gastos.service';
import { describe } from 'node:test';

const gastoService = new GastoService();

describe('Gastos Service', () => {
  const gasto = {
    alunoId: 1,
    valorLanche: 10,
    lanche: 'Coxinha',
    descricao: 'Lanche da tarde',
  };

  it('should return created gasto', async () => {
    const gastoCriado = await gastoService.create(gasto);

    expect(gastoCriado.gasto.valorLanche).toBe(gasto.valorLanche);
    expect(gastoCriado.gasto.lanche).toBe(gasto.lanche);
    expect(gastoCriado.gasto.descricao).toBe(gasto.descricao);
  });

  it('should return all gastos', async () => {
    const gastos = await gastoService.findAll();

    expect(gastos.length).toBeGreaterThan(1);
  });

  it('should return deleted gasto', async () => {
    const gastoCriado = await gastoService.create(gasto);
    const gastoDeletado = await gastoService.delete(gastoCriado.gasto.id.toString());

    expect(gastoDeletado.gasto.id).toBe(gastoCriado.gasto.id);
  });
});
