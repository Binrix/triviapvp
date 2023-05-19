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

  createLobby() {
    return this.httpClient.post<any>('/api/create', { subject: this.subject, difficulty: this.difficulty });
  }
}
