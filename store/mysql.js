const mysql = require('mysql');
const { mysql: {
    host,
    user,
    password,
    database
} } = require('../config');

const connection = mysql.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database
});

// let connection;

// function handleConnection() {
//     connection = mysql.createConnection(dbconf);

//     connection.connect((err) => {

//         if (err) {
//             console.error("[db err]", err);
//             setTimeout(handleConnection, 2000);
//         } else {
//             console.log("DB CONNECTED")
//         }
//     });

//     connection.on('error', err => {


//         if (err.code === "PROTOCOL_CONNECTION_LOST" && err) {
//             // eslint-disable-next-line no-unused-vars
//             console.error("[db err]", err);
//             handleConnection();
//         } else {
//             throw err;
//         }
//     })
// }

// handleConnection()

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

                if (err) {


                    let state = ""

                    if (err.sqlMessage) {
                        state = err.sqlMessage.includes("Unknown column");
                    }

                    if (state) {
                        return resolve(null)
                    }

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

function query(table, query, join) {

    let joinQuery = "";

    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, result) => {
                if (err) return reject(err);

                resolve(result);
            })
    });
}

module.exports = {
    connection,
    upsert,
    query,
    list,
    remove,
    update,
    get
}