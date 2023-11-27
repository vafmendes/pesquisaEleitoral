require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
     .then(()=> {
        console.log('base de dados conectada');
        app.emit('pronto')
     }).catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const csurf = require('csurf');
const {middewareGlobal} = require('./src/middlewares/middleware');
const port = process.env.PORT;


//Carregando páginas

// app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOption = session({
    secret: 'secrets_sessions',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    }
});
app.use(sessionOption);
app.use(flash());

app.set('views', path.resolve(__dirname,'src', 'views'));
app.set('view engine', 'ejs');

app.use(middewareGlobal);
// app.use(checkCsrfError);
app.use(routes);

app.on('pronto', ()=>{
    app.listen('8000', () =>{
        console.log(`Acessar http://localhost:8000`);
        console.log('Servidor executando na porta 8000');
    });
});


