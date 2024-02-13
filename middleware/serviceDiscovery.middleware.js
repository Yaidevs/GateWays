const services = require("./../config/services.json");
const AppError = require("./../errorHandler/appError.errorHandler");
const catchAsync = require("./../errorHandler/catchAsync.errorHandler");
const axios = require('axios');


// service discovery middleware for finding and redirecting to the right microservices.
const serviceDiscovery = catchAsync(async (req, res, next) => { // extra logic for checking the validity;
	const route = req.originalUrl;
	console.log(route);
	// Determine the corresponding microservice for the route
	const matchedService = Object.values(services).find(service => service.routes.includes(route));

	if (matchedService) { // Rewrite the request URL to the microservice's URL
		req.url = matchedService.routes.includes(route) ? route : '/';
		req.headers['host'] = new URL(matchedService.url).host;
		// Forward the modified request to the microservice
		const microserviceResponse = await axios({
			method: req.method,
			url: matchedService.url + req.url,
			headers: req.headers,
			data: req.body
		});
		console.log(matchedService.url + req.url);
		console.log(microserviceResponse)
		// Send the microservice response back to the client
		res.status(microserviceResponse.status).json(microserviceResponse.data);
	} else { // No matching microservice found
		res.status(404).send('Not Found');

	}
	next();

});

// const serviceDiscovery = async (req, res, next) => {
// next(new AppError(`Can't find ${
// req.originalUrl
// } on our server`, 404));
// return;
// };

module.exports = serviceDiscovery;
