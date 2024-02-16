// const connectDb = require("./config/db");
const {createServer} = require("./app.js");

const PORT = process.env.PORT || 4000;

/*
General error handling for syncronus code.

! REMEMBER: it should be set in the beginning.

*/
process.on("uncaughtException", (err) => {
	console.log(err);
	console.log("Uncaught Exception");
	console.log("SHUTTING DOWN");
	process.exit(1);
});

const app = createServer();
app.listen(PORT, () => {
	console.log("app is listenning");
	// //? Connecting to the database.
	// connectDb();
});

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message),
	console.log("Unhandled error happened and shutting down ....");
	process.exit(1);
});
