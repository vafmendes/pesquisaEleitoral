const express = require('express');
const route = express.Router();
const multer = require('multer');
const homeController = require('./src/controllers/homeController');
const arquivosController = require('./src/controllers/arquivosController');


//Rotas da home
route.get('/', homeController.index);
route.get('/upload/', arquivosController.index2);
route.post('/upload/index', arquivosController.upload);


module.exports = route;
