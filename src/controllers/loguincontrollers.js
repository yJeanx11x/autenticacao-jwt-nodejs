const validacao = require('../schemas/loguinSchema')
const db = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()




// criação de loguin 
async function criarLoguin(req, res, next) {

    try {
        const z = validacao.safeParse(req.body)
        if (!z.success) {
            return res.status(400).json({ message: 'Error na criação' })
        }
        // criptografia da senha
        const passwordHash = await bcrypt.hash(z.data.password, 12)

        await db.create({
            nome: z.data.nome,
            email: z.data.email,
            password: passwordHash
        })

        return res.status(201).json({ message: 'Loguin criado' })

    } catch (error) {
        next(error)
    }

}

async function loguin(req, res, next) {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: 'Email é obrigatório' })
        }
        if (!password) {
            return res.status(400).json({ message: 'Senha é obrigatório' })
        }
        const usuario = await db.findOne({ where: { email } })
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }
        // comparação da senha
        const senhaDoUsuario = await bcrypt.compare(password, usuario.password)

        if (!senhaDoUsuario) {
            return res.status(400).json({ message: 'Senha invalida' })
        }

        try {
            // criação do token
            const secret = process.env.SECRET
            const token = jwt.sign({
                id: usuario._id,
            }, secret)
            const userId = usuario.id
            return res.status(200).json({ message: 'Loguin com sucesso', token , userId})
        } catch (error) {
            next(error)
        }


     
    } catch (error) {
        next(error)
    }



}
// rota privada

async function rotaPrivas(req, res, next) {

    try {
        const { id } = req.params

        const userExitente = await db.findOne({ where: { id }, attributes: { exclude: ['password'] } })
        if (!userExitente) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        return res.status(200).json({ message: 'Rota privada', userExitente })

    } catch (error) {
        next(error)
    }


}
module.exports = { criarLoguin, loguin, rotaPrivas }