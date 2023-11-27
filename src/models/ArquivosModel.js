/** ------------------ IMPORTING MONGOOSE ------------------ **/
const mongoose = require('mongoose');
const multer = require('multer');
const csvParser = require('csv-parser');
const path = require('path');
const fs = require('fs');
const routes = require('../../routes');

const fileSchema = new mongoose.Schema({
  data_pesquisa:{type: String},
  municipio:{type: String},
  estado:{type: String},
  intencao_de_voto:{type: String}
});


const FilesModel = mongoose.model("filesUploads", fileSchema);

/** ------------------ EXPORTING MODEL ------------------ **/
module.exports = FilesModel;