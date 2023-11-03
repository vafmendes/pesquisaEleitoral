/** ------------------ IMPORTING MONGOOSE ------------------ **/
const mongoose = require('mongoose');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');

const fileSchema = new mongoose.Schema({
  fileName:{type: String, required: true},
  filePath:{type: String, required: true},
  file:{type: String, required: true}
});




/** ------------------ MAKING MODEL ------------------ **/
const FilesModel = mongoose.model("filesUplo", fileSchema);

class Arquivos{
  constructor(body){
    this.body = body;
    this.errors = [];
    this.file = null;
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) {
      return;
    }
    this.file = FilesModel.create(
        this.body = {
        fileName: this.body.fileName,
        filePath: this.body.filePath,
        file: this.body.file
    });

    try {
      // Salve o documento no banco de dados
      await this.file.save();
    }catch(error) {
      this.errors.push('Erro ao salvar o arquivo no banco de dados.');
    }

    const results = [];
    const header =[];
    fs.createReadStream(this.file.filePath) //seeting up the path for file upload
    .pipe(csvParser())
    .on('headers', (headers) => {
        headers.map((head) => {
            header.push(head);
        });
        console.log(header);
    })
    .on('data', (data) =>
    results.push(data));


  }

  valida() {
    this.cleanUp();

    // Verifique o tipo MIME do arquivo
    if (this.body.file && this.body.file.mimetype !== "text/csv") {
      this.errors.push('Selecione apenas arquivos CSV.');
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  }

}


/** ------------------ EXPORTING MODEL ------------------ **/
module.exports = Arquivos;