

const config = {
    api: {
        host: process.env.HOST || "localhost",
        port: process.env.PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secreto"
    }
}

module.exports = config