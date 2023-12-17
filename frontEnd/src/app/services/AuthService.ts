import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACTIVE_USER_KEY = 'ActiveUser';
  private readonly AUTH_TOKEN_KEY = 'auth_token';


  private isLoggedIn = false;
  private username: string = ''; // Add a property to store the username
  private activeUser: string = ''

  constructor() {}

  setAuthToken(token: string): void {
    sessionStorage.setItem(this.AUTH_TOKEN_KEY, token); // Store token in local storage
  }

  setLoggedIn(username: string) {
    this.isLoggedIn = true;
    this.username = username;
    sessionStorage.setItem(this.ACTIVE_USER_KEY, username);
  }

  isLoggedInUser() {
    return !!sessionStorage.getItem('auth_token'); // Check for the presence of token
  }

  getUsername() {
    return sessionStorage.getItem(this.ACTIVE_USER_KEY)!.toString()
  }

  logout(): void {
    sessionStorage.removeItem(this.ACTIVE_USER_KEY)
    sessionStorage.removeItem(this.AUTH_TOKEN_KEY); // Remove token on logout
  }

}
