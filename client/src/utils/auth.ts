import { JwtPayload, jwtDecode } from 'jwt-decode';
import { debug } from 'tone';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<JwtPayload>(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return localStorage.getItem('token') !== null;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    if (!token) return true;
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (!decodedToken.exp) return false;
        return decodedToken && decodedToken.exp < currentTime;
      } catch (error) {
        console.error("Error decoding token:", error);
        return true;
      }
    }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('token') ?? '';
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
