const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'API for managing library books and members',
        },
        tags: [
            {
                name: 'Members',
                description: 'Endpoints related to member operations',
            },
            {
                name: 'Library',
                description: 'Endpoints related to library operations',
            },
        ],
    },
    apis: ['./routes/memberRoute.js', './routes/libraryRoute.js'], // Path to the API routes file
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
