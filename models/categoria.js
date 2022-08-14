const Sequelize = require('sequelize');
const database = require('../db');

const Categoria = database.define('categoria', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
 
    nome: String,
    nomelink: { type:       Sequelize.STRING, field: 'nome_link' }
 

  


},
{
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
    tableName: 'categoria'

})

module.exports = Categoria;