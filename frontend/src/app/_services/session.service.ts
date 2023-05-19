import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  username: string = '';
  token: string = '';

  constructor(
    private readonly httpClient: HttpClient
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
   * Logs in the user.
   * @param username 
   * @param password 
   * @returns 
   */
  public login(username: string, password: string) {
    return this.httpClient.post<any>("/api/login", { username, password });
  }
}
