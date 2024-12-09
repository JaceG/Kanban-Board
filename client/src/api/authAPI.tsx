import { UserLogin } from '../interfaces/UserLogin';

const login = async (userInfo: UserLogin) => {
	// TODO: make a POST request to the login route

	try {
		const response = await fetch('/auth/login/', {
			// The login route is specified here
			method: 'POST', // The HTTP method is set to POST
			headers: {
				'Content-Type': 'application/json', // The content type is set to JSON
			},
			body: JSON.stringify(userInfo), // The user information is converted to a JSON string and sent in the request body
		});

		const data = await response.json(); // The response is parsed as JSON

		if (!response.ok) {
			throw new Error('invalid API response, check network tab!'); // An error is thrown if the response status is not OK
		}

		return data; // The parsed data is returned
	} catch (err) {
		return Promise.reject('Servers down buddy, try again later.'); // If an error occurs, a rejected promise with a custom error message is returned
	}
};

export { login };
