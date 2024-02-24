const services = require('./../config/services.json');
const serviceDiscovery = catchAsync(async (req, res, next) => {
	const serviceName = req.originalUrl.split("/")[2];
	console.log(serviceName);
	if (! serviceName || ! services.hasOwnProperty(serviceName)) {
		res.status(404).json({success: false, message: "docs not found"});
		return;
	}
	const serviceMetadata = services[serviceName];
	res.redirect(serviceMetadata.docUrl);
	return;

});

module.exports = serviceDiscovery;
