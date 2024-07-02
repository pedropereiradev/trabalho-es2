import { PrismaClient } from '@prisma/client';
import { CreateAlunoPayload } from '../interfaces/aluno.interface';
import CustomError from '../utils/customError';

export default class AlunoService {
  private prisma = new PrismaClient();
  private Aluno = this.prisma.aluno;

  async findAll() {
    return this.Aluno.findMany();
  }

  async create(data: CreateAlunoPayload) {
    const { nome, turma, nomeResponsavel, telResponsavel } = data;

    if (!nome || !turma || !nomeResponsavel || !telResponsavel) {
      throw new CustomError(
        'Informe nome, turma, nome do responsavel, telefone',
        400
      );
    }

    const aluno = await this.Aluno.create({
      data,
    });

    return aluno;
  }
}