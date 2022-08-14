const Sequelize = require('sequelize');
const database = require('../db');

const Subcategoria = database.define('subcategoria', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    idCategoria: { type: Sequelize.INTEGER, field: 'id_categoria' },

    nome: String,
    nomelink: { type: Sequelize.STRING, field: 'nome_link' }
 

  


},
{
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
    tableName: 'subcategoria'

})

module.exports = Subcategoria;