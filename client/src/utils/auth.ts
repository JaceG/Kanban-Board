import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return localStorage.getItem('token') !== null;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
  }

  getToken(): string {
    // TODO: return the token
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
