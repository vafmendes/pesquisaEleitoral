const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');
const homeController = require('./src/controllers/homeController');
const arquivosController = require('./src/controllers/arquivosController');

const upload = multer({dest: 'uploads/'});




//Rotas da home
route.get('/', homeController.index);
route.post('/upload', upload.single('csvFile'), arquivosController.upload);


module.exports = route;
