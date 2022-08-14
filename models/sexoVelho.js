const Sequelize = require('sequelize');
const database = require('../db');

const SexoVelho = database.define('sexoVelho', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    idVelho: {  field : 'id_velho',      type: Sequelize.INTEGER},
    idSexo: {   field : 'id_sexo',       type: Sequelize.INTEGER},
    creditado: Boolean

},
{
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
    tableName: 'sexo_velho'
})

module.exports = SexoVelho;