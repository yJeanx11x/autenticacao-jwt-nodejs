const jwt = require('jsonwebtoken')
require('dotenv').config()
// Middleware para verificar o token de autenticação
async function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido!', })
    }


}

module.exports = { verificarToken }

