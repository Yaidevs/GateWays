const axios = require('axios');

exports.getRole = async (req) => {
	const url = 'https://user.dawaafinder.com/api/v1/user/role';

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': req.headers.authorization
	};


	const response = await microserviceRes(headers, url);
	return response;
};

const microserviceRes = async (headers, url) => {
	try {
		console.log(headers);
		console.log(url)
		const response = await axios({method: 'GET', null: url, headers: headers});
		console.log(response);
		const role = response.data.role;
		return role ? role : null;
	} catch (err) { // err.response.data;
		console.log(`the error is ${err}`);
		return null;
	}
};
