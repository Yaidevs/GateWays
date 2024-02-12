const services = require("./../config/services.json");
const AppError = require("./../errorHandler/appError.errorHandler");

const serviceDiscovery = async (req, res, next) => {
	const url = req.originalUrl;
	// extra logic for checking the validity;

	next();
};
