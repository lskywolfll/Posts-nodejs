const TABLA = "user";
const TABLE_FOLLOW = TABLA + "_follow";
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

        const { name, username } = data;

        const user = {
            id: nanoid(),
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

    async function follow(from, to) {
        return store.upsert(TABLE_FOLLOW, {
            user_from: from,
            user_to: to
        });
    }

    async function following(user) {

        const join = {};
        join[TABLA] = "user_to";
        const query = { user_from: user }

        return store.query(TABLE_FOLLOW, query, join);
    }

    return {
        list,
        get,
        create,
        remove,
        update,
        follow,
        following
    };
}