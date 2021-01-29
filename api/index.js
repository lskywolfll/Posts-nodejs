const express = require('express');
const app = express();
const { api: { port } } = require('../config');

const user = require('./components/user/network');
// Routes

app.use('/api/user', user);

app.listen(port, () => {
    console.log(`Api escuchando en: http://localhost:${port}`);
});