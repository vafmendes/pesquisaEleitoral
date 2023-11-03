const express = require('express');
const route = express.Router();
const multer = require('multer');
const homeController = require('./src/controllers/homeController');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../uploads/");
//   },
//   filename: function (req, file, cb) {
//       cb(null, file.originalName);
//     }
// });

const uploads = multer({ dest: 'uploads' });

//Rotas da home
route.get('/', homeController.index);
route.post('/upload/index', uploads.single('file'), homeController.upload);


module.exports = route;
