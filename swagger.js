const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Getway Api ',
			version: '1.0.0',
			description: ' DawaFinder Getway Api is a gateway to access all dawafinder microservices.'
		},
		servers: [
			{
				url: 'http://api.dawaafinder.com',
				description: 'Production server'
			}, {
				url: 'http://localhost:5000/api/v1',
				description: 'Development server'
			},
		]
	},
	apis: ['./documentation/*.txt'], // Path to the API docs
};

const specs = swaggerJsDocs(options);

module.exports = {
	swaggerUi,
	specs
};
