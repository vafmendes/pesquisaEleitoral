/** ------------------ IMPORTING PACKAGE/MODELS ------------------ **/
const Arquivos= require('../models/ArquivosModel');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const csvToJson = require('csvtojson');


module.exports.upload = async(req, res) => {
    console.log(req.file);
    console.log(req.file.originalname);
    console.log(req.file.destination);
    // try{
    //   const csvFile = fs.createReadStream(path.join(__dirname + '..','..','..','uploads',`${req.file.filename}`));
    //   csvToJson({delimiter: ';'}).fromStream(csvFile).then((json)=>{
    //     console.log(json);
    //     let file = Arquivos.insertMany(json); 
    //   }).catch(e => console.log(e));
    // }catch(e){
    //   console.status(400).json(e);

    const datas = [];

    fs.createReadStream(path.join(__dirname + '..','..','..','uploads',`${req.file.filename}`))
    .pipe( csvParser({separator: ';'||',',mapHeaders: ({ header, index }) => header.toLowerCase()}))
     .on('data', (data) =>{
      datas.push(data);
    })
    .on('end',async ()=>{
     console.log(datas);
     let file = await Arquivos.insertMany(datas);
   })


    return res.send("Ok");
}