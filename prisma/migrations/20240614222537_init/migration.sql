-- CreateTable
CREATE TABLE "alunos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "turma" VARCHAR(60) NOT NULL,
    "observacao" VARCHAR(120),
    "nomeResponsavel" VARCHAR(60) NOT NULL,
    "telResponsavel" VARCHAR(60) NOT NULL,
    "numCompras" INTEGER NOT NULL DEFAULT 0,
    "totalCompras" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "numDepositos" INTEGER NOT NULL DEFAULT 0,
    "totalDepositos" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gastos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(60) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lanche" VARCHAR(60) NOT NULL,
    "valorLanche" DOUBLE PRECISION NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "depositos" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" VARCHAR(60) NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "depositos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gastos" ADD CONSTRAINT "gastos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "depositos" ADD CONSTRAINT "depositos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
