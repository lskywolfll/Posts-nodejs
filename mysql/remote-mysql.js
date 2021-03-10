const remote = require('./remote');

const {
    mysqlService: {
        port,
        host
    }
} = require('../config');

module.exports = new remote(host, port);