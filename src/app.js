'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Connect to database.
mongoose.connect('mongodb+srv://lucas:lucasilva108@cluster0-jdnvd.mongodb.net/test?retryWrites=true&w=majority');

// Load routes.
const indexRoutes = require('./routes/index-routes');
const productRoutes = require('./routes/product-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;