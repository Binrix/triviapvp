import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  lobbyUrl: String = '';
  quizContent: [any] = [{}];

  constructor() { }
}
