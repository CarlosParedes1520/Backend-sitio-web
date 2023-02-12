require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

// crear servidor de expres
const app = express();

// configurar cors
app.use(cors())


// Lectura y parseo del body en postman 
app.use(express.json());

//webSitePro       //42GGysbbhhaWQn9N
// base de datos BD
dbConnection();
// console.log(process.env);

// rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))



app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto'+3000);
})
