import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameoptionService {
  difficulty: String = '';
  subject: String = '';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  /**
   * Returns the open rooms
   * @returns The rooms that are open
   */
  getLobbies() {
    return this.httpClient.get<any>('/api/rooms');
  }

  /**
   * Creates a lobby
   * @returns 
   */
  createLobby() {
    return this.httpClient.post<any>('/api/create', { subject: this.subject, difficulty: this.difficulty });
  }
}
