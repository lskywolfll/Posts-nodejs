const response = require('./response');

// eslint-disable-next-line no-unused-vars
function errors(err, req, res, next) {


    const message = err.message || "Error interno";
    const status = err.statusCode || 500;

    response.Error(res, message, status);
}

module.exports = errors