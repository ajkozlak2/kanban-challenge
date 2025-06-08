import { jwtDecode, JwtPayload } from 'jwt-decode';

class AuthService {
  // Get the decoded token
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null; // Decode the token if it exists
  }

  // Check if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Return true if token exists and is not expired
  }
  
  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds
    return decoded.exp ? decoded.exp < currentTime : true; // Return true if expired
  }

  // Get the token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || ''; // Return the token or an empty string if not found
  }

  // Log in the user and set the token
  login(idToken: string) {
    localStorage.setItem('id_token', idToken); // Store the token in localStorage
    window.location.href = '/'; // Redirect to the home page
  }

  // Log out the user
  logout() {
    localStorage.removeItem('id_token'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();