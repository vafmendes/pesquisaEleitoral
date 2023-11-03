/** ------------------ IMPORTING MONGOOSE ------------------ **/
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const fileSchema = new mongoose.Schema({
  fileName:{type: String, required: true},
  filePath:{type: String, required: true},
  file:{type: String, required: true}
});




/** ------------------ MAKING MODEL ------------------ **/
const FilesModel = mongoose.model("files", fileSchema);

class Arquivos{
  constructor(body){
    this.body = body;
    this.errors = [];
    this.file = null;
  }

  async register() {
    this.valida();
    this.file = await FilesModel.create(
        this.body = {
        fileName: this.body.fileName,
        filePath: this.body.filePath,
        file: this.body.file
    });

  }

  valida() {
    this.cleanUp();
    //Validação
  // file is not csv
    if(this.file.mimetype != "text/csv") {
        this.errors.push('Select CSV files only.');
    }
  }

  cleanUp(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
        fileName: this.body.fileName,
        filePath: this.body.filePath,
        file: this.body.file
    }
}

}


/** ------------------ EXPORTING MODEL ------------------ **/
module.exports = Arquivos;