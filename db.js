const Sequelize = require('sequelize');
const sequelize = new Sequelize('classificados', 
'postgres', '23232323', {dialect: 'postgres', host: 'localhost'});



module.exports = sequelize;
