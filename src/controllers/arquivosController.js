/** ------------------ IMPORTING PACKAGE/MODELS ------------------ **/
const csvParser = require('csv-parser');
const Arquivos= require('../models/ArquivosModel');
const path = require('path');

/** ------------------ EXPORTING FUNCTION To upload a file ------------------ **/
module.exports.index2 = function(req, res){
    return res.render("../views/upload");
  }

module.exports.upload = async (req, res) => {
    const arquivos = new Arquivos(req.body);
    try{
        await arquivos.register();
        if(arquivos.errors.length > 0){
            req.flash('errors', arquivos.errors);
            req.session.save(()=>{
                return res.redirect('back');
            });
        }
        req.flash('success', 'Seus dados foram importados');
        req.session.file = arquivos.file;
            req.session.save(() =>{
                return res.redirect('back');
            })

    }catch(e){
        console.log(e);
        return res.render('../views/includes/404');
    }
}   