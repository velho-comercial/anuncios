var express = require('express');
var router = express.Router();

var Velho = require('../models/velho');
var bodyParser = require('body-parser');


router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('frmMembro', { title: 'Express' });
});



router.post('/', function(req, res, next) {


  Velho.create({usuario: req.body.usuario, senha: req.body.senha, recuperacao: req.body.recuperacao});

  res.send("criado com sucesso!");



});

module.exports = router;
