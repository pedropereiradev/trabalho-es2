import express from 'express';
import alunosRoutes from './src/routes/alunos';
import saldoRoutes from './src/routes/saldo';
import gastosRoutes from './src/routes/gastos';
// import votosRoutes from './routes/votos';
const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use('/alunos/saldo', saldoRoutes);
app.use('/alunos', alunosRoutes);
app.use('/gastos', gastosRoutes);

app.get('/', (req, res) => {
  res.send('API: Sistema de Controle de Votos Rainha da Fenadoce');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
