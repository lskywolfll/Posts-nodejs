const express = require('express');
const app = express();
const cors = require('cors');
const { api: { port } } = require('../config');

const user = require('./components/user/network');

// Config Server

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ limit: "5mb", extended: true }))
app.use(cors());

// Documentation for apis
const swaggerUI = require('swagger-ui-express');
const { specs, options } = require('./Documentation');

app.use("/api-docs", swaggerUI.serve);
app.get("/api-docs", swaggerUI.setup(specs, { swaggerOptions: options }));

// Routes

app.use('/api/user', user);

app.listen(port, () => {
    console.log(`Api escuchando en: http://localhost:${port}`);
});