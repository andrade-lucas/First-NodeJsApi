'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    res.status(200).send({
        id: '1',
        Description: 'Rice',
        Price: '5,99'
    });
};

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.save().then(x => {
        res.status(201).send({status: true, message: 'Produto cadastrado com sucesso'});
    }).catch(e => { 
        res.status(400).send({status: false, message: 'Erro ao cadastrar produto', data: e});
    });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({ id: id, item: req.body });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({ id: id, item: req.body });
};