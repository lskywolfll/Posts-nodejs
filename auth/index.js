
const jwt = require('jsonwebtoken');
const { jwt: { secret } } = require("../config");
const error = require('../utils/error');

function sign(data) {
    return jwt.sign(data, secret);
}

function getToken(auth) {
    if (!auth) {
        throw error("No viene token", 401);
    }

    if (auth.indexOf("Bearer ") === -1) {
        throw error("Formato Invalido", 401);
    }

    const token = auth.replace("Bearer ", "");

    return token;
}

function verify(token) {
    return jwt.verify(token, secret, (err, decoded) => {

        if (err) {
            throw error("Token Invalido", 401);
        }

        return decoded

    });
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || "";
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

const check = {
    own: function (req, owner = "") {
        const decoded = decodeHeader(req);

        if (decoded.id !== owner) {
            throw error("No puedes hacer esto", 401);
        }

        return decoded
    },

}

module.exports = {
    sign,
    check
}