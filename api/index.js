const express = require('express');
const app = express();
const cors = require('cors');
const { api: { port } } = require('../config');

const user = require('./components/user/network');
// Routes

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ limit: "5mb", extended: true }))
app.use(cors());

app.use('/api/user', user);

app.listen(port, () => {
    console.log(`Api escuchando en: http://localhost:${port}`);
});