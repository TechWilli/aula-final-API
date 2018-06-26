const express = require('express');
const ExpressMongoDb = require('express-mongo-db');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID

const app = express();

app.use(ExpressMongoDb('mongodb://localhost/hamburgueria'));
app.use(bodyParser.json());
app.use(cors());

// AQUI FAZEMOS A REQUISIÇÃO DE TODOS OS LANCHES DA HAMBURGUERIA (TODOS OS COMBOS)

app.get('/hamburgueria', (req, res) => {
    req.db.collection('combos').find().toArray((err, data)=> {
        if(err) {
            res.status(500).send();
            return;
        }
        res.send(data);
    })
});

// AQUI PEGAMOS/CONSULTAMOS OS COMBOS POR ID PARA FUTURAS ANALISES

app.get('/hamburguer/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('combos').findOne(query, (err, data)=> {
        if(err) {
            res.status(500).send();
            return;
        }
       if(!data) {
           res.status(404).send();
           return;
       }

       res.send(data);
    })
});

// AQUI FAZEMOS O POST DO HAMBURGUER COM SUAS CARACTERISTICAS

app.post('/hamburguer', (req, res) => {
    let combos = {
        numero: req.body.numero,
        tamanho: req.body.tamanho,
        bebida: req.body.bebida,
        adicional: req.body.adicional
    };

    req.db.collection('combos').insert(combos, (err, data)=> {
        if(err) {
            res.status(500).send();
            return;
        }

        res.send(req.body);
    });

});

// AQUI FAZEMOS O UPDATE EM UM PEDIDO JA EXISTENTE, SEM NECESSIDADES DE CRIAR UM NOVO OU APAGAR O MESMO

app.put('/hamburguer/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    let combos = {
        numero: req.body.numero,
        tamanho: req.body.tamanho,
        bebida: req.body.bebida,
        adicional: req.body.adicional
    };    

    req.db.collection('combos').updateOne(query, combos, (err, data)=> {
        if(err) {
            res.status(500).send();
            return;
        }
       if(!data) {
           res.status(404).send();
           return;
       }

       res.send(data);
    });
});

// AQUI FAZEMOS O DELETAMENTO DE UM PEDIDO EXISTENTE

app.delete('/hamburguer/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('combos').deleteOne(query, (err, data) => {
        if(err) {
            res.status(500).send();
            return;
        }

        res.send(data);
    });
});


app.listen(3000);