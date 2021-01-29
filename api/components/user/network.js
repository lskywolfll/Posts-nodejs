const express = require('express');
const router = express.Router();
const controller = require('./index');
const response = require('../../../network/response');

router.get('/', async (req, res) => {

    try {
        const lista = await controller.list();
        response.Success(res, lista);
    } catch (error) {
        response.Error(res, error);
    }

});

router.get('/:id', async (req, res) => {

    try {
        const user = await controller.get(req.params.id);

        response.Success(res, user);
    } catch (error) {
        response.Error(res, error);
    }

})

router.post('/create', async (req, res) => {

    try {

        const user = await controller.create(req.body);

        response.Success(res, user);

    } catch (error) {
        response.Error(res, error);
    }

})

router.delete("/:id", async function (req, res) {


    try {

        const deleted = await controller.remove(req.params.id);

        response.Success(res, deleted);

    } catch (error) {
        response.Error(res, error);
    }
})

module.exports = router;