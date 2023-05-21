import { Component, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  currentRoundSet: any = this.gameService.quiz.results[this.gameService.round];
  roundLimit: number = 0

  constructor(
    public gameService: GameService,
    private router: Router
  ) 
  {
    this.roundLimit = gameService.quiz.results.length;
    console.log(this.roundLimit);
  }

  ngOnInit(): void {
    this.currentRoundSet= this.gameService.quiz.results[this.gameService.round];
  }

  sendAnswer(answer: string) {
    console.log(this.gameService.round);
    this.gameService.round++;
    console.log(this.gameService.round);
    this.router.navigateByUrl('/question', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/question']);
    });

    // Ansatz für Punktevergabe
    // if(answer == this.currentRoundSet.correct_answer) {

    // } else {

    // }

  }
}
