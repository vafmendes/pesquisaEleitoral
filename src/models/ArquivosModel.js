/** ------------------ IMPORTING MONGOOSE ------------------ **/
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String
  },
  filePath : {
    type:String
  },
  file: {
    type: String
  }
}, {
  timestamps: {
    options: { timeZone: 'America/São Paulo' }
  }
});




/** ------------------ MAKING MODEL ------------------ **/
const files = mongoose.model("files", fileSchema);

/** ------------------ EXPORTING MODEL ------------------ **/
module.exports = files;