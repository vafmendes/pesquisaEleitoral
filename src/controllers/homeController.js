const Arquivos= require('../models/ArquivosModel');
const multer = require('multer');
const csvP = require('csv-parser');
const fs = require('fs');

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

/**********EXPORTING FUNCTION FOR Register ROUTE******************/
module.exports.index = function(req, res){
  return res.render("index");
}

module.exports.upload = async (req, res) => {

  const arquivos = new Arquivos(req.body);
  try{
      //  if(!req.params.id) return res.render('../views/includes/404');
        
        await arquivos.register();
        console.log(arquivos);
      
      //   if(csv.errors.length > 0){
      //     req.flash('errors', csv.errors);
      //     req.session.save(()=>{
      //         return res.redirect('/index');
      //     });
      //     return;
      // }
        req.flash('success', 'Seus dados foram importados');
          req.session.save(() =>{
              return res.redirect('back');
          })

  }catch(e){
      console.log(e);
      return res.render('../views/includes/404');
  }
}

  // try {
  //   const file = req.file.buffer;

  //   const dataArr = [];

  //   fs.createReadStream(file)
  //     .pipe(csvP())
  //     .on('data', (row) => {
  //       dataArr.push(row);
  //     })
  //     .on('end', async () => {
  //       res.json({ message: 'Dados do CSV importados com sucesso', insertedData });
  //     });
  // } catch (error) {
  //   res.status(500).json({ error: 'Erro ao processar o arquivo CSV' });
  // }

   


