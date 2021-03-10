const express = require('express');
const router = express.Router();
const controller = require('./index');
const response = require('../../../network/response');
const secure = require('./secure');

// Routes

router.get('/', Listar);
router.get('/:id', buscarPorID);
router.post('/create', crear);
router.post("/follow/:id", secure("follow"), follow);
router.post("/followers", secure("follow"), followers);
router.put("/update", secure("update"), update);
router.delete("/:id", eliminarPorID);

// Internal Functions

async function follow(req, res, next) {
    try {
        console.log(req.user.id)
        const status = await controller.follow(req.user.id, req.params.id);
        response.Success(res, status, 201);

    } catch (error) {
        next(error);
    }
}


async function followers(req, res, next) {
    try {
        const followers = await controller.following(req.user.id);
        response.Success(res, followers);

    } catch (error) {
        next(error);
    }
}

async function Listar(req, res, next) {
    try {
        const lista = await controller.list();
        response.Success(res, lista);
    } catch (error) {
        next(error);
    }
}

async function buscarPorID(req, res, next) {
    try {
        const user = await controller.get(req.params.id);

        response.Success(res, user);
    } catch (error) {
        next(error);
    }
}

async function crear(req, res, next) {
    try {
        const user = await controller.create(req.body);

        response.Success(res, user, 201);

    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {

        const update = await controller.update(req.body);

        response.Success(res, update);

    } catch (error) {
        next(error);
    }
}

async function eliminarPorID(req, res, next) {
    try {

        const deleted = await controller.remove(req.params.id);

        response.Success(res, deleted);

    } catch (error) {
        next(error);
    }
}

module.exports = router;