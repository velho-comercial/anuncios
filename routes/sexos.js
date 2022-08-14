var express = require('express');
var router = express.Router();


var bodyParser = require('body-parser');
var SexoVelho = require('../models/sexoVelho');

router.use(bodyParser.json());



router.get('/', async function(req, res, next) {
 
  console.log("chegou");
   

  res.render('sexos', { title: 'cenas de sexo explícito encontradas'});
   

});

/* router.get('/:id/:fetiche', async function(req, res, next) {

   
  let sexo = await Sexo.findOne( {where: {id:  req.params.id}});
  
console.log(" aqui" + req.cookies.idUsuario)

  let sexoV = await SexoVelho.findOne({where: { idVelho: parseInt(req.cookies.idUsuario), idSexo: req.params.id  }})

   let acesso = false;

   

   




  res.render('sexo', { title: 'cenas de sexo explícito encontradas', sexo, acesso : sexoV  });
   

});





router.post('/', function(req, res, next) {


  Velho.create({usuario: req.body.usuario, senha: req.body.senha});

  res.send("criado com sucesso!");



}); */

module.exports = router;
