
const express = require('express');
const app = express()

app.use(express.json())
const erroglobal = require('../middlewares/erroglobalmiddlewares')
app.use(erroglobal)
const routes=require('../routes/routes')
app.use(routes)
app.listen(3333, () => console.log("Servidor Rodando!"))