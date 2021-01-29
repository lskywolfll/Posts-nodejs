const express = require('express');
const router = express.Router();
const { Success } = require('../../../network/response');

router.get('/', async (req, res) => {

    Success(res, "Todo bien");

});

module.exports = router;