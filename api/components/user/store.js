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

module.exports = {
    list
}