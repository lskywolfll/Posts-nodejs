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
})

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

function upsert(table, data) {
    return new Promise((resolve, reject) => {
        connection
            .query(`
                INSERT INTO ${table} SET ?`, data, (err, data) => {
                if (err) return reject(err);

                resolve(data);
            })
    });
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        connection
            .query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) => {
                if (err) return reject(err);

                resolve(result);
            })
            .on('end', function () {
                console.log('User ' + ' has updated his socketID to ');
            });
    });
}

module.exports = {
    connection,
    upsert,
    query
}