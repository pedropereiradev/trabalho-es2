// Service saldo feito por PEDRO

import { PrismaClient } from '@prisma/client';
import { CreateGastoPayload } from '../interfaces/gasto.interface';
import CustomError from '../utils/customError';

export default class GastoService {
  private prisma = new PrismaClient();
  private Gasto = this.prisma.gasto;

  async findAll() {
    return this.Gasto.findMany({
      include: {
        aluno: true,
      },
    });
  }

  async create(data: CreateGastoPayload) {
    const { descricao, alunoId, lanche, valorLanche } = data;

    if (!alunoId || !descricao || !lanche || !valorLanche) {
      throw new CustomError(
        'Informe valor, data, id do aluno, descrição, lanche e valor do lanche',
        400
      );
    }

    const [gasto, aluno] = await this.prisma.$transaction([
      this.prisma.gasto.create({
        data,
      }),
      this.prisma.aluno.update({
        where: { id: data.alunoId },
        data: {
          totalCompras: { increment: Number(data.valorLanche) },
          numCompras: { increment: 1 },
        },
      }),
    ]);

    return {
      gasto,
      aluno,
    };
  }

  async delete(id: string) {
    const gastoExistente = await this.Gasto.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!gastoExistente) {
      throw new CustomError('Gasto não encontrado', 404);
    }

    const [gasto, aluno] = await this.prisma.$transaction([
      this.prisma.gasto.delete({
        where: { id: Number(id) },
      }),
      this.prisma.aluno.update({
        where: { id: gastoExistente.alunoId },
        data: {
          totalCompras: { decrement: gastoExistente.valorLanche },
          numCompras: { decrement: 1 },
        },
      }),
    ]);

    return {
      gasto,
      aluno,
    };
  }
}
