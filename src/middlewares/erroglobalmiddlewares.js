function erroglobal(erro, req, res, next) {

    return res.status(500).json({ error: erro.message })

}

module.exports = erroglobal