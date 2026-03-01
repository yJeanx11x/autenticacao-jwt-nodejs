const db = require('../config/database')

const User = db.sequelize.define('Usuarios', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true


    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }
})

User.sync({ force: false });

module.exports = User

