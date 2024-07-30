const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const catchAsync = require("./../../../errorHandler/catchAsync.errorHandler");
const serverJsonPath = path.join(__dirname, './../../../config/services.json');

// for adding a new microservice to the system.
exports.AddService = catchAsync(async (req, res) => {
	const {serviceName, url, docUrl} = req.body;
	// Read existing data from server.json
	const serverConfig = require(serverJsonPath);
	// const serverData = await fs.readFile(serverJsonPath, 'utf8');
	// const serverConfig = JSON.parse(serverData);
	// Add new microservice to the config
	serverConfig[serviceName] = {
		url,
		docUrl
	};
	await fs.writeFile(serverJsonPath, JSON.stringify(serverConfig, null, 2));
	// Write updated data back to server.json
	// await fs.writeFile('server.json', JSON.stringify(serverConfig, null, 2));
	res.status(200).json({success: true, message: 'Microservice added successfully'});
});


exports.GetMicroServices = catchAsync(async (req, res, next) => {
	const serverData = await fs.readFile(serverJsonPath, 'utf8');
	const serverConfig = JSON.parse(serverData);
	res.status(200).json({serverConfig});
})
