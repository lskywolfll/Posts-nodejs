const mysql = require('mysql');
const { mysql: {
    host,
    user,
    password,
    database
} } = require('../config');

const dbconf = {
    host,
    user,
    password,
    database
};

let connection;

function handleConnection() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {

        if (err) {
            console.error("[db err]", err);
            setTimeout(handleConnection, 2000);
        } else {
            console.log("DB CONNECTED")
        }
    });

    connection.on('error', err => {


        if (err.code === "PROTOCOL_CONNECTION_LOST" && err) {
            // eslint-disable-next-line no-unused-vars
            console.error("[db err]", err);
            handleConnection();
        } else {
            throw err;
        }
    })
}

handleConnection()

module.exports = {
    connection
}