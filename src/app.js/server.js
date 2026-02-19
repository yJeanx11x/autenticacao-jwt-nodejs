
const express = require('express');
const app = express()

app.use(express.json())

const erroglobal = require('../middlewares/erroglobalmiddlewares')

app.use(erroglobal)

app.listen(3333, () => console.log("Servidor Rodando!"))