// Service saldo feito por MATEUS

import { PrismaClient } from '@prisma/client';

export default class SaldoService {
  private prisma = new PrismaClient().$extends({
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

  async findAll() {
    const alunos = await this.prisma.aluno.findMany({
      select: {
        id: true,
        nome: true,
        totalCompras: true,
        numCompras: true,
        saldo: true,
      },
    });

    return alunos;
  }
}