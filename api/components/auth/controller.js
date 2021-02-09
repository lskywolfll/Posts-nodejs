const TABLA = "auth";
const auth = require('../../../auth');

module.exports = function (injectedStore) {
    let store = injectedStore || require('../../../store/dummy');

    async function login(username, password) {
        console.log(password);
        const data = await store.query(TABLA, { username });

        if (data.password === password) {
            //generar token
            return auth.sign(data);
        } else {
            throw new Error("Informacion Invalida")
        }
    }

    function upsert(data) {
        const authData = {
            id: data.id,
        };

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        login
    };
}