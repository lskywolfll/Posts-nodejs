const TABLA = "auth";
const bcrypt = require("bcryptjs");
const auth = require('../../../auth');

module.exports = function (injectedStore) {
    let store = injectedStore || require('../../../store/dummy');

    async function login(username, password) {
        const result = await store.query(TABLA, { username });
        const data = {
            id: result[0].id,
            username: result[0].username,
            password: result[0].password
        };

        const validator = bcrypt.compareSync(password, data.password);

        if (validator) {
            return auth.sign(data);
        } else {
            throw new Error("Informacion Invalida");
        }
    }

    async function upsert(data) {

        const authData = {
            id: data.id,
        };

        console.log(data.id)

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        login
    };
}