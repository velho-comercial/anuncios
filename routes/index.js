var express = require('express');
const { append } = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();
var Produto = require('../models/produto');
var Categoria = require('../models/categoria');
var Subcategoria = require('../models/subcategoria');
var Anunciante = require('../models/anunciante');
var multer = require('multer');
var fs = require("fs");
var sharp = require("sharp");
var slugify = require("slugify");
var campos = multer();
const Sequelize = require('sequelize');

const Op = Sequelize.Op;  
/* GET home page. */


;

router.get('/buscar', async function(req, res, next) {



   const produtos = await Produto.findAll({ where: { titulo: { [Sequelize.Op.iLike]: '%' +  req.query.palavrasChave  + '%' } } });


   
   produtos.forEach(result => {
 
    if(result.diretorioMedia != null)
    {
      result.fotos = [];
     fs.readdirSync('./public/fotos/' + result.diretorioMedia).forEach(file => {
   
       const foto1 =    file;
     
       result.fotos.push(foto1);
    
      
    });
  }
    
  });




  res.render("resultado", {produtos});
});


router.post('/entrar', async function(req, res, next) {

  
    const usuario =  await  Anunciante.findOne({ where: {usuario: req.body.usuario, senha: req.body.senha} });
      
     if(usuario == null){
       res.send("usuário não encontrado");
     }else{
       
         res.cookie('usuario', usuario.nome)
         res.cookie('idAnunciante', usuario.id)
         res.send("logado")
     }
   

  
 });


 router.get('/delete-produto/:id', async function(req, res, next) {

 
   Produto.destroy({ where: {id : req.params.id }})

   console.log('teste' + req.params.id );

  const produtos = await Produto.findAll({ where: {idAnunciante : 7 }})

 res.render("meusAnuncios", {produtos});
});
 

 router.get('/meus-anuncios', async function(req, res, next) {

 
   const produtos = await Produto.findAll({ where: {idAnunciante : 7 }})

   console.log(produtos);

  res.render("meusAnuncios", {produtos});
 });


router.get('/entrar', async function(req, res, next) {

 

  res.render("entrar");
 });

 router.get('/sair', async function(req, res, next) {

  res.clearCookie("usuario");

  res.clearCookie("idUsuario");
  res.send("sair")

 });
 
 

 router.get('/produto/:id/:slug', async function(req, res, next) {

 
  const produto = await Produto.findOne({where: { id: req.params.id}});
  const anunciante = await Anunciante.findOne({where: {id : produto.idAnunciante}})

 
    if(produto.diretorioMedia != null)
    {
      produto.fotos = [];
     fs.readdirSync('./public/fotos/' + produto.diretorioMedia).forEach(file => {
   
       const foto1 =    file;
     
       produto.fotos.push(foto1);
    
      
    });
  }
    
 
  console.log(anunciante);

  

  res.render("detalhes", {produto, anunciante});

});


router.get('/subcategorias', async function(req, res, next) {

   
  const subcategorias = await Subcategoria.findAll({where: {idCategoria: req.query.idCategoria}});

  res.status(200);
 res.json(subcategorias);

});

router.get('/alterar', async function(req, res, next) {

   
  const anunciante = await Anunciante.findOne({where: {id: 7}});


 res.render("alterar", {anunciante});

});


router.post('/alterar', async function(req, res, next) {

   
  const anunciante = await Anunciante.update({
     nome : req.body.nome,
    
   
   },
   {where: {id: 7}}
   
   )


   res.redirect('/alterar');

 

});


router.get('/adicionar-anuncio', async function(req, res, next) {

   
    const categorias = await Categoria.findAll();

  
   res.render("anunciar", {categorias});

});

router.get('/cadastrar', async function(req, res, next) {

  

res.render("cadastrar");
});


router.post('/cadastrar', async function(req, res, next) {

   Anunciante.create({ nome: req.body.nome,  usuario: req.body.usuario, senha: req.body.senha, telefone: req.body.telefone });

 res.render("cadastrado");
});

router.post('/anunciar', campos.fields([{name: 'foto1'}, {name: 'foto2' }, {name: 'foto3'}, {name: 'foto4'}, {name: 'foto5'}, {name: 'foto6'}]),  async function(req, res, next) {



  console.log("abaixo" + req.body.inputNumfiles);
  console.log(req.body);

  const  produtoRequest  = req.body;

  



        const numeroSubdiretoriosFotos = fs.readdirSync('./public/fotos/').length;

        produtoRequest.diretorioMedia =  (numeroSubdiretoriosFotos + 1);

        


        const novoSubdiretorioFotos = './public/fotos/' + (numeroSubdiretoriosFotos + 1);

        fs.mkdirSync(novoSubdiretorioFotos);

        for(let i = 0; i < req.body.inputNumfiles; i++){

          await sharp(req.files['foto' + (i +1)][0].buffer).resize({width: 1000, height:1000}).toFile(novoSubdiretorioFotos + "/" + slugify(" dfdf df df") + i + '.jpg');

        }



  
      Produto.create({  idAnunciante: req.cookies.idAnunciante, titulo: req.body.titulo, descricao: req.body.descricao, preco: req.body.preco, diretorioMedia:  (numeroSubdiretoriosFotos + 1), slug: 'teste', urlVideo: req.body.url_video });

      res.send("anunciado com sucesso");












});



router.get('/', async function(req, res, next) {
 
     
  let usuario  = null;

     if(req.cookies.usuario != null){
         usuario = req.cookies.usuario ;
          
     }
  

  const produtos = await Produto.findAll({   offset: 0, limit: 2,});



res.render('index', { title: 'Site com conteúdo para velhos, novinhas', usuario, produtos});

});







/* router.get('/assistir', async function(req, res, next) {


  

  let sexos = await Sexo.findAll();

 
 
  res.render('assistir', { title: 'Site com conteúdo para velhos, novinhas', layout: 'layout_smp', sexos });

});


router.get('/', async function(req, res, next) {


    


      const velho = req.cookies.usuario;

      console.log(req.cookies)


      let sexos = await Sexo.findAll();
    
      sexos.forEach((e) => {
          e.cache = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(e.cache)
      });

 

  res.render('index', { title: 'Site com conteúdo para velhos, novinhas', velho, sexos});

});


router.post('/comprar', async function(req, res, next) {

  
     const idVelho = req.cookies.idUsuario;
     
     const sexo = await SexoVelho.findOne({where: {  idVelho, idSexo: req.body.sexo  }})
     
     if(sexo != null){
       if(sexo.creditado == true)
       {
       res.send("Você já adquiriu esta cena. ")
       }
       else
       {
        res.send("Você já solicitou essa cena, será liberado em breve. ")
       }

     }else{
      SexoVelho.create({  idVelho, idSexo: req.body.sexo  })
      res.send("pedido realizado com sucesso!");
     }
   
   

     

   
  



});

router.post('/recuperar', async function(req, res, next) {


  const usuario =  await  Velho.findOne({where:  {usuario: req.body.usuario, recuperacao: req.body.recuperacao}});

  if(usuario === null){
    res.send("nada encontrado")
  }else{
    res.send(usuario.senha);
  }

  



});


router.post('/', function(req, res, next) {


  Velho.create({usuario: req.body.usuario, senha: req.body.senha});



});



router.post('/entrar',  async function(req, res, next) {


  const usuario =  await  Velho.findOne({where:  {usuario: req.body.velho, senha: req.body.senha}});

  if(!usuario){
 
    res.send("nada encontrado");

  }else{
    res.cookie('usuario', usuario.usuario)
    res.cookie('idUsuario', usuario.id)
    console.log("entrou");
    res.send("ok")
    
  }

  
});
router.get('/sair', function(req, res, next) {

  res.clearCookie("usuario");

  res.send("sair")
 
});


router.get('/entrar', function(req, res, next) {
  res.render("entrar", {layout: 'layout_smp'});
});



router.get('/gostei', function(req, res, next) {
  res.render("gostei", {layout: 'layout_smp'});
});


router.get('/colaborar', function(req, res, next) {
  res.render("colaborar");
});

router.get('/detalhes', function(req, res, next) {





  res.render("detalhes",{acesso: true});
});
 */

module.exports = router;
