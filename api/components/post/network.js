const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');
const secure = require('./secure');

//Routes

router.get("/", list);
router.get("/:id", getByID);
router.put("/update/:id", secure("update"), update);
router.post("/create", create);
router.delete("/:id", deleteByID);

// Functions

async function create(req, res, next) {
    try {

        const newPost = await controller.create(req.body);

        response.Success(res, newPost, 201);

    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {

        const updated = await controller.upsert(req.body, req.params.id);

        response.Success(res, updated, 201);

    } catch (error) {
        next(error);
    }
}

async function deleteByID(req, res, next) {
    try {

        const postDeleted = await controller.deleted(req.params.id);

        response.Success(res, postDeleted);

    } catch (error) {
        next(error);
    }
}

async function getByID(req, res, next) {
    try {

        const post = await controller.getByID(req.params.id);

        response.Success(res, post);

    } catch (error) {
        next(error);
    }
}

async function list(req, res, next) {
    try {

        const data = await controller.list();

        response.Success(res, data);

    } catch (error) {
        next(error);
    }
}

module.exports = router;