const TABLA = "user";
const nanoid = require("nanoid");

module.exports = function (injectedStore) {

    let store = injectedStore || require('../../../store/dummy');

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    function create(data) {

        const { name, id } = data;

        const user = {
            id: id ? id : nanoid(),
            name: name,
        };

        return store.upsert(TABLA, user);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        create,
        remove
    };
}