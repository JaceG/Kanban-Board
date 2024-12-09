import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
	getProfile() {
		// TODO: return the decoded token
		// The token is retrieved using the getToken method and decoded using jwtDecode<JwtPayload>.
		return jwtDecode<JwtPayload>(this.getToken());
	}

	loggedIn() {
		// TODO: return a value that indicates if the user is logged in
		// Check if a token exists in localStorage. If a token is found, return true, indicating the user is logged in.
		return localStorage.getItem('token') !== null;
	}

	isTokenExpired(token: string) {
		// TODO: return a value that indicates if the token is expired
		// If the token is not provided, return true.
		if (!token) return true;
		try {
			// Decode the token using jwtDecode<JwtPayload>.
			const decodedToken = jwtDecode<JwtPayload>(token);
			// Get the current time in seconds.
			const currentTime = Date.now() / 1000;
			// If the token does not have an exp field, consider it not expired.
			if (!decodedToken.exp) return false;
			// Compare the token's exp field with the current time to determine if the token is expired.
			return decodedToken.exp < currentTime;
		} catch (error) {
			// If an error occurs during decoding, log the error and return true.
			console.error('Error decoding token:', error);
			return true;
		}
	}

	getToken(): string {
		// TODO: return the token
		// Retrieve the token from localStorage. If no token is found, return an empty string.
		return localStorage.getItem('token') ?? '';
	}

	login(idToken: string) {
		// TODO: set the token to localStorage
		// Store the provided idToken in localStorage.
		localStorage.setItem('token', idToken);
		// TODO: redirect to the home page
		// Redirect the user to the home page.
		window.location.assign('/');
	}

	logout() {
		// TODO: remove the token from localStorage
		// Remove the token from localStorage.
		localStorage.removeItem('token');
		// TODO: redirect to the login page
		// Redirect the user to the login page.
		window.location.assign('/login');
	}
}

export default new AuthService();
