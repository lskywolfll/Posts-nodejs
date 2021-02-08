
const { api: { port, host } } = require('../../config');
const swaggerJSDOC = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Red Social",
        version: "1.0.0",
        description: "Red Social NodeJS",
        contact: {
            name: "Rene",
            url: "https://github.com/lskywolfll",
            email: "lskywolfll@gmail.com"
        }
    },
    server: [
        {
            url: `http://${host}:${port}`
        },
        {
            url: `http://${host}`
        }
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    schemas: ["htpp", "https"]
};

const routesDocumentation = [
    "api/Documentation/apis/*.yaml",
    "api/Documentation/apis/***/*.yaml"
];

const options = {
    swaggerDefinition,
    apis: routesDocumentation
};

const specs = swaggerJSDOC(options);

module.exports = {
    specs,
    options
}