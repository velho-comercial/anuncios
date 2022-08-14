const Sequelize = require('sequelize');
const database = require('../db');

const Anunciante = database.define('anunciante', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
 
    nome: String,
    telefone: String,
    usuario: String,
    senha: String,

    

  


},
{
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
    tableName: 'anunciante'

})

module.exports = Anunciante;