const Sequelize = require('sequelize')
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_USER, process.env.DB_HOST, process.env.DB_PASS, {
    host: process.env.DB_LOCAL,
    dialect: process.env.DB_DIALECT
})

try {
    sequelize.authenticate()
    console.log("Servidor Rodando!")

} catch (error) {
    console.log(error)
}

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}