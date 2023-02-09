require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

// crear servidor de expres
const app = express();

// configurar cors
app.use(cors())

//webSitePro       //42GGysbbhhaWQn9N
// base de datos BD
dbConnection();
console.log(process.env);

// rutas
app.get('/', (req, res)=>{
    res.json(
        {
            ok: true,
            msg: 'hola mundo'
        }
    )
});

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto'+3000);
})
