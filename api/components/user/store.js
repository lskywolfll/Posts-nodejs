const { connection } = require('../../../store/mysql');

function list(table) {
    return new Promise((resolve, reject) => {
        connection
            .query(`
                SELECT
                *
                FROM ${table}
            `, (err, data) => {

                if (err) {
                    return reject(err);
                }

                resolve(data);
            });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection
            .query(`
                SELECT
                *
                FROM ${table}
                WHERE id=${id}
            `, (err, data) => {
                const state = err.sqlMessage.includes("Unknown column");

                if (state) {
                    return resolve(null)
                }

                if (err) {
                    return reject(err)
                };

                resolve(data[0]);
            })
    });
}

function remove(table, id) {
    return new Promise((resolve, reject) => {
        connection
            .query(`
                DELETE FROM ${table}
                WHERE id=${id}
            `, (err, data) => {
                if (err) return reject(err);

                resolve(data);
            })

    });
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection
            .query(`
                INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (err, data) => {
                if (err) return reject(err);

                resolve(data);
            })
    });
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection
            .query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err)
                };

                resolve(result);
            })
    });
}

async function upsert(table, data) {
    const row = await get(table, data.id);

    if (!row) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) => {
                if (err) return reject(err);

                const output = {
                    id: result[0].id,
                    username: result[0].username,
                    password: result[0].password
                }

                resolve(output);
            })
    });
}

module.exports = {
    list,
    get,
    remove,
    insert,
    upsert,
    query
}