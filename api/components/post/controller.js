const TABLA = "post";

module.exports = function (injectedStore) {

    let store = injectedStore || require('../../../store/dummy');

    function list() {
        return store.list(TABLA);
    }

    async function getByID(id) {
        return store.get(TABLA, id)
    }

    async function create(data) {
        return store.upsert(TABLA, data)
    }

    async function upsert(data, id) {
        data["id"] = id;

        return store.update(TABLA, data)
    }

    async function deleted(id) {
        return store.remove(TABLA, id);
    }

    return {
        list,
        create,
        upsert,
        deleted,
        getByID
    }
}