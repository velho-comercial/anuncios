const Sequelize = require('sequelize');
const database = require('../db');

const Produto = database.define('produto', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
 
    

    urlVideo : {field: 'url_video', type: Sequelize.STRING},
    titulo: String,
    idAnunciante: {field: 'id_anunciante', type: Sequelize.INTEGER},
    descricao: String,
    preco: Number,
    diretorioMedia: {field: 'diretorio_media', type: Sequelize.STRING},
    slug: String,
    

  


},
{
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
    tableName: 'produto'

})

module.exports = Produto;