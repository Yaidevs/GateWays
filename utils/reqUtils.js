const axios = require('axios');
const AppError = require("./../errorHandler/appError.errorHandler");
// Assuming you have Axios installed in your project

exports.getMethod = async (url, body) => {
	try {
		const response = await axios.get(url);
		console.log(response.data);
		console.log(response.status);
		return response;
		// Check if the response status is in the 2xx range (indicating success)
		// if (response.status >= 200 && response.status < 300) {
		// return response.data;
		// } else {
		// // If the response status is not in the 2xx range, throw an error
		// // throw new Error(`Failed to make GET request. Status: ${response.status}`);
		// throw new AppError(err, response.status);
		// }
	} catch (err) { // Handle other errors (e.g., network issues, timeouts, etc.)

		console.log(err.message)

		return err.response;
	}
}
