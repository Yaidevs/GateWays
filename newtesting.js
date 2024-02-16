const axios = require('axios');

// Assuming you have Axios installed in your project

axios.get('http://localhost:5000/api/v1/customers').then(response => {
	if (response.status !== 200) {
		throw new Error(`HTTP error! status: ${
			response.status
		}`);
		console.log(response.data);

	}
	// Process the fetched customer data in response.data
	console.log(response.data);
}).catch(error => {
	console.error('Error fetching customers:', error);
});
