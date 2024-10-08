const newServices = require("./../config/newServices.json");
const AppError = require("./../errorHandler/appError.errorHandler");
const catchAsync = require("./../errorHandler/catchAsync.errorHandler");
const axios = require('axios');
const {getMethod} = require("./../utils/reqUtils");
const {getRole} = require("./auth.middleware");
const services = require("./../config/services.json");
const https = require('https');

const serviceDiscovery = catchAsync(async (req, res, next) => {
	let originalUrl = req.originalUrl.split("/");
	console.log(originalUrl);
	const serviceName = req.originalUrl.split("/")[1];
	console.log(serviceName);
	if (! serviceName || ! services.hasOwnProperty(serviceName)) {
		res.status(404).json({success: false, message: "Service not found"});
		return;
	}
	const serviceMetadata = services[serviceName];
	originalUrl = originalUrl.length > 2 ? originalUrl.slice(start = 2) : ["/"];
	const url = originalUrl.join("/");
	const base = serviceMetadata.url;
	console.log(base);
	const totalUrl = base + url;
	// console.log(totalUrl);
	// console.log(req.headers);
	const role = req.headers.authorization ? await getRole(req) : null;
	console.log(role);
	// req.headers.authorization = null;
	req.headers.role = role;
	// console.log(req.headers);
	let microserviceResponse = await microserviceRes(req, totalUrl);
	// console.log(microserviceResponse);
	res.status(microserviceResponse.status).json(microserviceResponse.data);


});


const microserviceRes = async (req, url) => {
	try {

		console.log(req.headers.role);
		const headers = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*', // this will be replace by my allowed origin id.
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Access-Control-Allow-Credentials': true,
			'role': req.headers.role,
			'Authorization': req.headers.authorization
		};

		console.log(headers)
		// Use these headers in your request
		const response = await axios({method: req.method, url: url, headers: headers, data: req.body});

		// const response = await axios({
		// method: req.method, url: url,
		// // headers: req.headers,
		// data: req.body,
		// // httpsAgent: agent
		// });
		console.log("hell there what is going on  HEEL O THIS THIS IT .")
		console.log(response);
		return response;
	} catch (err) {
		let response = err.response;
		if (! response) {
			response = {
				"status": 503,
				"data": " The microservice is not aviliable/accessable"
			}

		}

		return response;
	}
}


// const serviceDiscovery = catchAsync(async (req, res, next) => {
// const route = req.originalUrl;
// // how could i make this original url to include the url for those have id .
// const list = route.split("/");
// console.log(route)

// // Determine the corresponding microservice for the route
// const matchedService = Object.entries(newServices).find(([serviceName, serviceDetails]) => {
// return serviceDetails.route_details.some(routeDetails => routeDetails.route === route && routeDetails.method === req.method);
// });
// if (matchedService) {
// const [serviceName, serviceDetails] = matchedService;
// const routeDetails = serviceDetails.route_details.find(routeConfig => routeConfig.route === route && routeConfig.method === req.method);
// if (routeDetails.route.includes('{{ID}}')) {
// const idParam = req.params.Id; // Assuming you're using Express and the ID is part of the route params
// req.url = routeDetails.route.replace('{{ID}}', idParam);
// } else { // If no parameters, use the original route
// req.url = routeDetails.route;
// }

// req.headers['host'] = new URL(serviceDetails.url).host;
// console.log(serviceDetails.url + req.url);

// if (routeDetails.auth_required) {
// if (req.headers.authorization) {
// let role = await getRole(req);
// role = role.role;
// console.log(role);
// if ((routeDetails.allowed_roles[0] == "__all__") || (role && routeDetails.allowed_roles.includes(role))) {
// const headers = {
// Authorization: req.headers.authorization, // Pass the Bearer token from the original request
// };

// const microserviceRes = async () => {
// try {
// const response = await axios({
// method: req.method,
// url: serviceDetails.url + req.url,
// headers: headers,
// data: req.body
// });
// // console.log(response);
// return response;
// } catch (err) { // console.error(err);
// return err.response;
// }
// }
// let microserviceResponse = await microserviceRes();
// res.status(microserviceResponse.status).json(microserviceResponse.data);
// return;
// // The user has the required role
// // Add your logic here
// } else {
// res.status(401).json({success: false, data: "you are not allowed here"});
// return;
// }
// // console.log(role);
// // console.log(routeDetails.allowed_roles);
// } else {
// res.status(401).json({success: "false", data: "Authorization token is not provided"});
// return;
// }
// }
// // Forward the modified request to the microservice
// const microserviceRes = async () => {
// try {
// const response = await axios({
// method: req.method,
// url: serviceDetails.url + req.url,
// data: req.body
// });
// console.log(response);
// return response;
// } catch (err) {
// console.error(err);
// return err.response;
// }
// }
// let microserviceResponse = await microserviceRes();
// res.status(microserviceResponse.status).json(microserviceResponse.data);
// } else {
// next();
// }

// });

module.exports = serviceDiscovery;
