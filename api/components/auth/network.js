const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

router.post("/login", async (req, res) => {

    try {

        if (req.body.username && req.body.password) {
            const { username, password } = req.body;

            const login = await controller.login(username, password);

            response.Success(res, login);
        } else {
            response.Error(res, "Faltan datos", 400);
        }

    } catch (error) {
        console.log(error);
        response.Error(res, error.toString());
    }
})

module.exports = router;