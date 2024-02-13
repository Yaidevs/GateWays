const express = require("express");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const notFound = require("./middleware/404.middleware");
const errorMiddleware = require("./middleware/errors.middleware");
const morgan = require("morgan");
const serviceDiscovery = require("./middleware/serviceDiscovery.middleware");
exports.createServer = () => {
	const app = express();

	app.use(morgan("combined"));
	app.use(cors());
	// ? security middlewares.
	// mongoose.set("strictQuery", true);
	app.use(express.json());
	app.use(express.json({extended: false}));
	app.use(express.json({limit: "50kb"}));
	app.use(mongoSanitize());

	// ? ROUTES
	// app.use(
	// "/api/v1/",
	// require("./src/modules/customer/customer.route")
	// );

	// endpoint for checking if the server is up.
	app.get("/", (_req, res) => {
		res.status(200).send(" DawaFinder Getway  server is UP!");
	});
	// not found for non existing existing.
	// app.all("*", notFound);
	app.use(errorMiddleware);
	app.use(serviceDiscovery);

	return app;
};
