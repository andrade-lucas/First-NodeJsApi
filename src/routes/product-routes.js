'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

const get = router.get('/', controller.get);
const getBySlug = router.get('/:slug', controller.getBySlug);
const getById = router.get('/admin/:id', controller.getById);
const create = router.post('/', controller.post);
const put = router.put('/:id', controller.put);
const del = router.delete('/:id', controller.delete);

module.exports = router;