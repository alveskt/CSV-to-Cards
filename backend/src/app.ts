import playerController from './controllers/player.controller';

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;


app.use(cors());
app.use(express.json());

app.use('/api', playerController);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });