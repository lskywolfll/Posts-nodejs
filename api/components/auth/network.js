const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

router.post("/login", async (req, res) => {

    try {
        const { username, password } = req.body;

        const login = await controller.login(username, password);

        response.Success(res, login);

    } catch (error) {
        console.log(error)
        response.Error(res, error);
    }
})

module.exports = router;