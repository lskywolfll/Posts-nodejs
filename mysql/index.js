const express = require('express');
const app = express();
const {
    mysqlService: {
        port
    }
} = require('../config');
const rutas = require('./network');

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(rutas);

app.listen(port, () => {
    console.log(`Servicio de mysql escuchando en el puerto: ${port}`)
})