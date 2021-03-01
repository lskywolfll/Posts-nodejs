const TABLA = "user";
const auth = require('../auth');
const { nanoid } = require("nanoid");

module.exports = function (injectedStore) {

    let store = injectedStore || require('../../../store/dummy');

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function create(data) {

        const { name, username, id } = data;

        const user = {
            id: id ? id : nanoid(),
            name: name,
            username
        };

        if (data.password || data.name) {
            await auth.upsert({
                id: user.id,
                password: data.password,
                username
            })
        }

        return store.upsert(TABLA, user);
    }

    async function update(data) {
        return store.upsert(TABLA, data);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        create,
        remove,
        update
    };
}