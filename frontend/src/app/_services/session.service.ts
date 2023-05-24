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

  public logout() {
    localStorage.removeItem("token");
  }

  public setToken(token: string, username: string): void {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }

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
