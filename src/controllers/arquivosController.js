/** ------------------ IMPORTING PACKAGE/MODELS ------------------ **/
const csvParser = require('csv-parser');
const Csv= require('../models/ArquivosModel');
const path = require('path');

/** ------------------ EXPORTING FUNCTION To upload a file ------------------ **/
module.exports.upload = async (req, res) => {
    const csv = new Csv(req.body);
    try{
        await cadastro.register();
        if(csv.errors.length > 0){
            req.flash('errors', csv.errors);
            req.session.save(()=>{
                return res.redirect('back');
            });
        }
        req.flash('success', 'Seus dados foram importados');
            req.session.save(() =>{
                return res.redirect('back');
            })

    }catch(e){
        console.log(e);
        return res.render('../views/includes/404');
    }
}   