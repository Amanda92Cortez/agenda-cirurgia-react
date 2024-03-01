const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const agendamentosRoutes = require('./agendamento');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', agendamentosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
