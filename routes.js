const express = require('express');
const route = express.Router();
const multer = require('multer');
const homeController = require('./src/controllers/homeController');
const arquivosController = require('./src/controllers/arquivosController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, resolve(__dirname,"..", "..", 'uploads/files'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
        // Verifica se a extensão do arquivo é .csv
        const extname = path.extname(file.originalname);
        if (extname.toLowerCase() === '.csv') {
          cb(null, file.fieldname + '-' + uniqueSuffix + extname);
        } else {
          // Se a extensão não for .csv, você pode lidar com o erro ou rejeitar o arquivo
          cb(new Error('Apenas arquivos .csv são permitidos'), null);
        }
      }
  })
  
  const upload = multer({ storage: storage })

//Rotas da home
route.get('/', homeController.index);
route.post('/upload', upload.single('uploaded_file'),arquivosController.upload);


module.exports = route;
