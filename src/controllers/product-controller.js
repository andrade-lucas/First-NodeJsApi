'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
    Product.find({ active: true }, 'title price slug').then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    });
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({ active: true, slug: req.params.slug }, 'title description price slug tags').then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    });
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id).then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    });
}

exports.getBytag = (req, res, next) => {
    Product.find({ active: true, tags: req.params.tag }, 'title description price slug tags').then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    });
}

exports.post = (req, res, next) => {
    var contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos.
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    var product = new Product(req.body);
    product.save().then(x => {
        res.status(201).send({ status: true, message: 'Produto cadastrado com sucesso' });
    }).catch(e => {
        res.status(400).send({ status: false, message: 'Erro ao cadastrar produto', data: e });
    });
};

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({
            status: true,
            message: 'Produto atualizado com sucesso!'
        }).catch(e => {
            res.status(400).send({
                status: false,
                message: 'Falha ao atualizar produto',
                data: e
            });
        });
    });
};

exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id).then(x => {
        res.status(200).send({
            status: true,
            message: 'Produto deletado com sucesso'
        })
    }).catch(e => {
        res.status(400).send({
            status: false,
            message: 'Erro ao deletar registro'
        });
    });
};