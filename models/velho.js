const Sequelize = require('sequelize');
const database = require('../db');

const Velho = database.define('velho', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    nome: String,
    usuario: String,
    recuperacao: String,
    senha: String

},
{
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
})

module.exports = Velho;