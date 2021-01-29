const TABLA = "user";

module.exports = function (injectedStore) {

    let store = injectedStore || require('../../../store/dummy');

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    function create(data) {
        return store.upsert(TABLA, data);
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