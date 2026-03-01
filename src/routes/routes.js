const express = require('express')
const controllers = require('../controllers/loguincontrollers')
const appRoute = express.Router()
const verificarToken = require('../controllers/verificarToken').verificarToken

appRoute.post('/loguin', controllers.criarLoguin)
appRoute.post('/loguinUser', controllers.loguin)
appRoute.get('/loguin/user/:id', verificarToken, controllers.rotaPrivas)


module.exports = appRoute