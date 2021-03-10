const request = require('request');

function createRemoteDB(host, port) {

    const URL = `http://${host}:${port}`;

    function req(method, params, data = "") {

        let url = `${URL}/${params}`;
        let body = data;

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                url,
                body,
            }, (err, res, body) => {

                if (err) {
                    console.error("Error con la base de datos remota: ", err);
                    return reject(err.message)
                }

                const resp = JSON.parse(body);
                return resolve(resp.body)

            });
        });

    }

    function list(table) {
        return req("GET", table);
    }

    function get(table, id) {
        return req("GET", table, id);
    }

    function upsert(table, data) {
        return req("POST", table, JSON.stringify(data));
    }

    function query(table, query, join) {
        const params = `${table}/query`

        const body = {
            query,
            join
        }

        return req("POST", params, JSON.stringify(body));
    }

    return {
        list,
        get,
        upsert,
        query
    }
}

module.exports = createRemoteDB