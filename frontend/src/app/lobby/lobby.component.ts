import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../_services/websocket.service';
import { Quiz } from '../shared/interfaces/quiz.interface';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public roomId: string | null = "";
  public players: string[] = [];
  public summarize: { socketId: string, points: number, username: string }[] = [];
  public startQuiz = false;
  public isInitator = false;
  public showSummarize = false;
  public gaveAnswer = false;
  public currentQuestionIndex = 0;
  public answers: { answer: string, questionIndex: number }[] = [];
  public quiz: Quiz = {
    results: []
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly websocketService: WebsocketService) { }

  public startGame() {
    if(this.roomId) {
      this.websocketService.startGame(this.roomId);
    }
  }

  /**
   * Gives the answer and sends it to the backend
   * @param answerFromUser The answer
   */
  public giveAnswer(answerFromUser: string) {
    this.answers.push({ answer: answerFromUser, questionIndex: this.currentQuestionIndex });
    
    if(this.roomId)
      this.websocketService.giveAnswer(this.roomId, answerFromUser);

    this.gaveAnswer = true;
  }

  ngOnInit(): void {
    this.websocketService.connect();
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.isInitator = this.route.snapshot.paramMap.get('initator') == "false" ? false : true;

    if(this.roomId)
      this.websocketService.joinRoom(this.roomId, localStorage.getItem("username")!);

    this.websocketService.getSocket().on('quiz-data', (quiz: any) => {
      this.quiz.results = quiz.quizContent;
    });
    this.websocketService.getSocket().on('end', (result: any) => {
      this.showSummarize = true;
      this.summarize = result;
    });
    this.websocketService.getSocket().on('next-question', () => {
      this.gaveAnswer = false;
      this.currentQuestionIndex++;
    });
    this.websocketService.getSocket().on('first-question', () => {
      this.startQuiz = true;
      this.currentQuestionIndex = 0;
    });
    this.websocketService.getSocket().on('player-joined', (data: string) => {
      this.players.push(data);
    });
  }
}
