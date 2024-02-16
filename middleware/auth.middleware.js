// HERE THERE WILL BE A METHOD THAT GET THE ROLE OF THE USER . BY THERE --JSON WEBTOKEN.

// FOR THAT PURPOSE . WE WILL TAKE THE JSON WEBTOKEN AND SEND TO THE USER AUTH AND GET BACK THE ROLE OF THE USER.
const axios = require('axios');

exports.getRole = async (req) => {
	const url = 'http://localhost:5000/api/v1/user/role';

	const headers = {
		Authorization: req.headers.authorization, // Pass the Bearer token from the original request
	};

	const microserviceRes = async () => {
		try {
			const response = await axios({method: 'GET', url: url, headers: headers});
			// console.log(response);

			return response.data; // Return the data property of the response
		} catch (err) { // console.error(err);
			return err.response.data; // Return the data property of the error response
		}
	};

	return microserviceRes();
};
// // Find the corresponding microservice configuration for the route
// const matchedService = Object.values(services).find(service => service.routes.some(routeConfig => routeConfig.route === route));

// if (matchedService) { // Find the route configuration for the specific route
// const routeConfig = matchedService.routes.find(routeConfig => routeConfig.route === route);

// if (routeConfig && routeConfig.auth_required) { // If authentication is required, perform authentication logic
// const userHasRequiredRole = await checkUserRoles(req.user, routeConfig.allowed_roles);

// if (userHasRequiredRole) { // If the user has the required role, continue to the next middleware
// next();
// } else { // If the user doesn't have the required role, send a 403 Forbidden response
// res.status(403).send('Forbidden');
// }
// } else { // If authentication is not required, continue to the next middleware
// next();
// }
// } else { // No matching microservice found for the route
// res.status(404).send('Not Found');
// }
// };

// const checkUserRoles = async (user, allowedRoles) => {
// // Implement your user role checking logic here (e.g., check against user roles in a database)

// // For simplicity, assuming req.user.roles is an array of user roles
// const userRoles = user.roles || [];

// return allowedRoles.some(role => userRoles.includes(role));
// };

// module.exports = authenticate;
