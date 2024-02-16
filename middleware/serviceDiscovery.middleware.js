const newServices = require("./../config/newServices.json");
const AppError = require("./../errorHandler/appError.errorHandler");
const catchAsync = require("./../errorHandler/catchAsync.errorHandler");
const axios = require('axios');
const {getMethod} = require("./../utils/reqUtils");
const {getRole} = require("./auth.middleware");

// Service discovery middleware for finding and redirecting to the right microservices.
const serviceDiscovery = catchAsync(async (req, res, next) => {
	const route = req.originalUrl;
	console.log(route);

	// Determine the corresponding microservice for the route
	const matchedService = Object.entries(newServices).find(([serviceName, serviceDetails]) => {
		return serviceDetails.route_details.some(routeDetails => routeDetails.route === route && routeDetails.method === req.method);
	});
	if (matchedService) {
		const [serviceName, serviceDetails] = matchedService;
		const routeDetails = serviceDetails.route_details.find(routeConfig => routeConfig.route === route && routeConfig.method === req.method);

		// Rewrite the request URL to the microservice's URL
		req.url = routeDetails.route;

		req.headers['host'] = new URL(serviceDetails.url).host;
		console.log(serviceDetails.url + req.url);

		if (routeDetails.auth_required) {
			if (req.headers.authorization) {
				let role = await getRole(req);
				role = role.role;
				console.log(role);
				if ((routeDetails.allowed_roles[0] == "__all__") || (role && routeDetails.allowed_roles.includes(role))) {
					const headers = {
						Authorization: req.headers.authorization, // Pass the Bearer token from the original request
					};

					const microserviceRes = async () => {
						try {
							const response = await axios({
								method: req.method,
								url: serviceDetails.url + req.url,
								headers: headers,
								data: req.body
							});
							// console.log(response);
							return response;
						} catch (err) { // console.error(err);
							return err.response;
						}
					}
					let microserviceResponse = await microserviceRes();
					res.status(microserviceResponse.status).json(microserviceResponse.data);
					return;
					// The user has the required role
					// Add your logic here
				} else {
					res.status(401).json({success: false, data: "you are not allowed here"});
					return;
				}
				// console.log(role);
				// console.log(routeDetails.allowed_roles);
			} else {
				res.status(401).json({success: "false", data: "Authorization token is not provided"});
				return;
			}
		}
		// Forward the modified request to the microservice
		const microserviceRes = async () => {
			try {
				const response = await axios({
					method: req.method,
					url: serviceDetails.url + req.url,
					data: req.body
				});
				console.log(response);
				return response;
			} catch (err) {
				console.error(err);
				return err.response;
			}
		}
		let microserviceResponse = await microserviceRes();
		res.status(microserviceResponse.status).json(microserviceResponse.data);
	}

});

// const checkUserRoles = async (user, allowedRoles) => {
// // Implement your user role checking logic here (e.g., check against user roles in a database)

// // For simplicity, assuming req.user.roles is an array of user roles
// const userRoles = user.roles || [];

// return allowedRoles.some(role => userRoles.includes(role));
// };

module.exports = serviceDiscovery;
