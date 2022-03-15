  const express = require('express');
  const cors = require('cors');
  const {Sequelize} = require('./models');
  const models=require('./models');

  const app=express();
  app.use(cors());
  app.use(express.json());

  let cliente=models.Cliente;
  let itempedido = models.ItemPedido;
  let pedido = models.Pedido;
  let servico = models.Servico;

  app.get('/', function(req, res){
      res.send('Olá, mundo!')
});

    app.post('/servicos', async(req,res) =>{
       await servico.create(
            req.body
       ).then(function(){
            return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
            })
        }).catch(function(erro){
            return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar."
        });
    });
});

   app.post('/clientes', async(req,res) =>{
       await cliente.create(
           req.body
       ).then(function(){
           return res.json({
            error: false,       
        message: "Cliente criado com sucesso!"})
    }).catch(function(erro){
           return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar."
        });
    });
});

    app.post('/pedidos', async(req,res) =>{
            await pedido.create(
            req.body
        ).then(function(){
            return res.json({
            error: false,
            message: "Pedido criado com sucesso!"})
    }).catch(function(erro){
            return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar."
        });
    });
});

   app.post('/itenspedido', async(req,res) =>{
        await itempedido.create(
            req.body
        ).then(function(){
            return res.json({
            error: false,
            message: "Item criado com sucesso!"
            })
        }).catch(function(erro){
            return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar."
        });
    });
});

   app.get('/listaservicos', async(req, res)=>{
       await servico.findAll({
           //raw: true
          order: [['nome', 'ASC']]
       }).then(function(servicos){
           res.json({servicos})
    });
});

   app.get('/ofertaservicos', async(req, res)=>{
       await servico.count('id').then(function(servicos){
           res.json({servicos});
    });
});

   app.get('/servico/:id', async(req, res)=>{
       await servico.findByPk(req.params.id)
       .then(serv =>{
           return res.json({
            error: false,
            serv
           });
      }).catch(function(erro){
          return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar!"
        });
    });
});

   app.put('/atualizaservico', async(req,res)=>{
       await servico.update(req.body,{
           where: {id: req.body.id}
      }).then(function(){
        return res.json({
            error: false,             
            message: "Serviço foi alterado com sucesso!"
        });
      }).catch(function(erro){
          return res.status(400).json({
            error:true,
            message: "Erro na alteração do serviço."
        });
    });
});

  app.get('/servicos', async(req,res) =>{
     await servico.create({
          nome: "Javascript",
          descricao: "Desenvolve páginas dinamicas e lógica computacional ",
        createAt: new Date(),
        updateAt: new Date()
        });
      res.send('Serviço criado com sucesso!');
});

 app.get('/pedidos/:id', async(req, res)=>{
     await pedido.findByPk(req.params.id,{include:[{all: true}]})
     .then(ped=>{
         return res.json({ped});
    }) 
})

 app.get('/excluircliente/:id', async(req, res)=>{
     await cliente.destroy({
         where: {id: req.params.id}
    }).then(function(){
         return res.json({
            error: false,
            massage: "Cliente foi excluido com sucesso!" 
        });
    }).catch(function(erro){
         return res.status(400).json({
            error: true,
            messagem: "Erro ao excluir o cliente."
        });
    });
});



//  app.get('/clientes-pedidos', async(req, res)=>{
//      await cliente.findAll({include : [{all: true}]})
//      .then(cli =>{
//          return res.json({
//              error: false,
//              cli
//          });
//      }).catch((erro) =>{
//          return res.status(400).json({
//              error: true,
//             message: "Problema de conexão."
//         });
//     });
// });

  let port=process.env.PORT || 3001;

  app.listen(port,(req,res)=>{
      console.log('Servidor ativo: http://localhost:3001');
});

// app.get('/', function(req, res){
//     res.send('Seja bem-vindo(a) a Services TI');
// })

// //inserir um novo cliente
// app.post('/cliente', async(req, res)=>{
//     await cliente.create(
//          req.body
//     ).then(cli =>{
//         return res.json({
//             error: false,
//             message: "Cliente foi inserido com sucesso.",
//             cli
//         });
//     }).catch(erro =>{
//         return res.status(400).json({
//             error: true,
//             message: "Problema de conexão."
//         });
//     });
// });    

// //inserir um pedido para um cliente existente
//   app.post('/cliente/:id/pedido', async(req, res) =>{
//            const ped = {
//           data: req.body.data,
//           ClienteId:req.params.id
//       };

//      if(! await cliente.findByPk(req.params.id)){
//          return res.status(400).json({
//             error: true,
//             message: "Cliente não existe."
//         });
//     };

//     await pedido.create.create(ped)
//     .then(pedcli =>{
//           return res.json({
//             error: false,
//             message: "Peido foi inserido com sucesso.",
//             pedcli
//         });
//     }).catch((erro)=>{
//           return res.status(400).json({
//             error: true,
//             message: "Problema de conexão."
//         });
//     });   
// });

// //exibir todos os cliente
// app.get('/clientes', async(req, res)=>{
//     await cliente.findAll()
//     .then(cli =>{
//         return res.json({
//            error: false,
//            cli
//         });
//     }).catch((erro) =>{
//         return res.status(400).json({
//           error: true,
//           message: "Problema de conexão."
//         });
//     });
// });

// //exibir todos os clientes e os pedidos relacionados ao cliente
// app.get('/clientes-pedidos', async(req, res)=>{
//     await cliente.findAll({include : [{fall: true}]})
//     .then(cli =>{
//         return res.json({
//            error: false,
//            cli
//         });
//     }).catch((erro) =>{
//         return res.status(400).json({
//           error: true,
//           message: "Problema de conexão."
//         });
//     });        
// });