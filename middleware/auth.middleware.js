const axios = require('axios');

exports.getRole = async (req) => {
	const url = 'http://localhost:5000/api/v1/user/role';

	const headers = {
		Authorization: req.headers.authorization, // Pass the Bearer token from the original request
	};

	const microserviceRes = async () => {
		try {
			const response = await axios({method: 'GET', url: url, headers: headers});
			return response.data.role; // Return the data property of the response
		} catch (err) { // console.error(err);
			return err.response.data; // Return the data property of the error response
		}
	};

	return microserviceRes();
};
