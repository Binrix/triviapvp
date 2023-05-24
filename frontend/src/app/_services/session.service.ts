import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  username: string = '';
  token: string = '';

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  /**
   * Registrates a new user.
   * @param username 
   * @param password 
   * @returns 
   */
  public signUp(username: string, password: string) {
    return this.httpClient.post<any>("/api/signup", { username, password });
  }

  /**
   * Logs out the user
   */
  public logout() {
    localStorage.removeItem("token");
  }

  /**
   * Sets the token in the local storage
   * @param token 
   * @param username 
   */
  public setToken(token: string, username: string): void {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }

  /**
   * Checks if the user is authorized
   * @returns Boolean, if authorized
   */
  public isAuthorized(): boolean {
    return !!localStorage.getItem("token");
  }

  /**
   * Logs in the user.
   * @param username 
   * @param password 
   * @returns 
   */
  public login(username: string, password: string) {
    return this.httpClient.post<any>("/api/login", { username, password });
  }
}
