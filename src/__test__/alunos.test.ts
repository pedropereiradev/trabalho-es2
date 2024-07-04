import { describe, it, expect, beforeEach, vi } from 'vitest';
import AlunoService from '../services/alunos.service';

vi.mock('../services/alunos.service', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      create: vi.fn().mockImplementation((aluno) => Promise.resolve({ ...aluno, id: 1 })),
      findAll: vi.fn().mockResolvedValue([
        { id: 1, nome: 'João', idade: 20, curso: 'Engenharia', turma: 'Turma A', nomeResponsavel: 'Maria', telResponsavel: '123456789' },
        { id: 2, nome: 'Maria', idade: 22, curso: 'Matemática', turma: 'Turma B', nomeResponsavel: 'João', telResponsavel: '987654321' },
      ]),
    })),
  };
});

describe('Service de Alunos com banco simulado', () => {
  let alunoService: AlunoService;

  beforeEach(() => {
    alunoService = new AlunoService() as AlunoService;
  });

  it('deve retornar o aluno inserido', async () => {
    const aluno = {
      nome: 'João',
      idade: 20,
      curso: 'Engenharia',
      turma: 'Turma A',
      nomeResponsavel: 'Maria',
      telResponsavel: '123456789',
    };
    const alunoCriado = await alunoService.create(aluno);

    expect(alunoCriado).toEqual({ ...aluno, id: 1 });
  });

  it('deve retornar todos os alunos', async () => {
    const alunos = await alunoService.findAll();

    expect(alunos).toHaveLength(2);
    expect(alunos[0].turma).toEqual('Turma A');
    expect(alunos[1].nomeResponsavel).toEqual('João');
  });
});