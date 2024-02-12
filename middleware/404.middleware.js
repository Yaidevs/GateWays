// global error handler for 404 or Not found URLS.
const AppError = require("./../errorHandler/appError.errorHandler");
const notFound = (req, res, next) => {
	next(new AppError(`can't find ${
		req.originalUrl
	} on our server`, 404));
	return;
};

module.exports = notFound;
