const express = require('express');
const router = express.Router();
const { list } = require('./controller');
const { Success } = require('../../../network/response');

router.get('/', async (req, res) => {
    const lista = list();
    Success(res, lista);
});

module.exports = router;