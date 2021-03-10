const express = require('express');
const router = express.Router();
const response = require('../network/response');
const Store = require('../store/mysql');

router.get('/:tabla', list);
router.get('/:tabla/:id', get);
router.post('/:tabla', insert);
router.put('/:tabla', upsert);
router.post("/:tabla/query", query);

async function query(req, res, next) {
    try {

        const tabla = req.params.tabla;
        const {
            query,
            join
        } = req.body;

        const list = await Store.query(tabla, query, join);

        response.Success(res, list);

    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {

        const list = await Store.list(req.params.tabla);

        response.Success(res, list);

    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {

        const item = await Store.get(req.params.tabla, req.params.id);

        response.Success(res, item);

    } catch (error) {
        next(error);
    }
}

async function insert(req, res, next) {
    try {

        const item = await Store.get(req.params.tabla, req.params.id);

        response.Success(res, item, 201);

    } catch (error) {
        next(error);
    }
}

async function upsert(req, res, next) {
    try {

        const datos = await Store.get(req.params.tabla, req.body);

        response.Success(res, datos, 201);

    } catch (error) {
        next(error);
    }
}

module.exports = router;