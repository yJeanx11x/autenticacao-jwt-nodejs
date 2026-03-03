const jwt = require('jsonwebtoken')
require('dotenv').config()
// Middleware para verificar o token de autenticação
async function verificarToken(req, res, next) {
    // Verificar se o token está presente no cabeçalho da requisição
    const authHeader = req.headers['authorization']
    // O token geralmente é enviado no formato 
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado!' })
    }
    try {
        // Verificar o token usando a chave secreta
        const secret = process.env.SECRET
        // Se o token for válido, a função jwt.verify irá decodificar o token e retornar o payload
        jwt.verify(token, secret)
        // Se o token for válido, permitir que a requisição prossiga para a próxima etapa
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido!'})
    }


}

module.exports = { verificarToken }

