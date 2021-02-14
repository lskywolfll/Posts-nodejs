const express = require('express');
const router = express.Router();
const controller = require('./index');
const response = require('../../../network/response');
const secure = require('./secure');

// Routes

router.get('/', Listar);
router.get('/:id', buscarPorID)
router.post('/create', crear)
router.put("/update", secure("update"), crear)
router.delete("/:id", eliminarPorID)

// Internal Functions

async function Listar(req, res) {
    try {
        const lista = await controller.list();
        response.Success(res, lista);
    } catch (error) {
        response.Error(res, error);
    }
}

async function buscarPorID(req, res) {
    try {
        const user = await controller.get(req.params.id);

        response.Success(res, user);
    } catch (error) {
        response.Error(res, error);
    }
}

async function crear(req, res) {
    try {
        const user = await controller.create(req.body);

        response.Success(res, user);

    } catch (error) {
        response.Error(res, error);
    }
}

async function eliminarPorID(req, res) {
    try {

        const deleted = await controller.remove(req.params.id);

        response.Success(res, deleted);

    } catch (error) {
        response.Error(res, error);
    }
}

module.exports = router;