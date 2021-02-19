require('dotenv').config();

const config = {
    api: {
        host: process.env.HOST || "localhost",
        port: process.env.PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secreto"
    },
    mysql: {
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "1234",
        password: process.env.MYSQL_PASSWORD || "1234",
        database: process.env.MYSQL_DATABASE || "1234"
    }
}

module.exports = config