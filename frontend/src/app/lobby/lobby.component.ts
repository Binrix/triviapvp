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
  public startQuiz = false;
  public isInitator = false;
  public gaveAnswer = false;
  public currentQuestionIndex = 0;
  public answers: { answer: string, questionIndex: number }[] = [];
  public quiz: Quiz =
  {
    response_code: 0,
    results:[
        {
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "medium",
          question: "In the movie &ldquo;The Iron Giant,&rdquo; this character is the protagonist.",
          correct_answer: "Hogarth Hughes",
          incorrect_answers: [
              "Kent Mansley",
              "Dean McCoppin",
              "Annie Hughes"
          ]
        },
        {
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "medium",
          question: "Velma Kelly and Roxie Hart are the protagonists of which Oscar winning movie?",
          correct_answer: "Chicago",
          incorrect_answers: [
              "Dreamgirls",
              "Cabaret",
              "All That Jazz"
          ]
        },
        {
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "medium",
          question: "In which 1973 film does Yul Brynner play a robotic cowboy who malfunctions and goes on a killing\tspree?",
          correct_answer: "Westworld",
          incorrect_answers: [
              "Runaway",
              "Android",
              "The Terminators"
          ]
        },
        {
          category:"Entertainment: Film",
          type:"multiple",
          difficulty:"medium",
          question:"What is the name of the robot in the 1951 science fiction film classic &#039;The Day the Earth Stood Still&#039;?",
          correct_answer:"Gort",
          incorrect_answers:[
              "Robby",
              "Colossus",
              "Box"
          ]
        },
        {
          category:"Entertainment: Film",
          type:"multiple",
          difficulty:"medium",
          question:"In the 1979 British film &quot;Quadrophenia&quot; what is the name of the seaside city the mods are visiting?",
          correct_answer:"Brighton",
          incorrect_answers:[
              "Eastbourne",
              "Mousehole",
              "Bridlington"
          ]
        },
        {
          category:"Entertainment: Film",
          type:"multiple",
          difficulty:"medium",
          question:"Which one of these action movies are shot entirely in one take?",
          correct_answer:"Victoria",
          incorrect_answers:[
              "Ip Man 2",
              "The Bourne Legacy",
              "L&eacute;on: The Professional"
          ]
        },
        {
          category:"Entertainment: Film",
          type:"boolean",
          difficulty:"medium",
          question:"The movie &quot;Tron&quot; received an Oscar nomination for Best Visual Effects.",
          correct_answer:"False",
          incorrect_answers:[
              "True"
          ]
        },
        {
          category:"Entertainment: Film",
          type:"multiple",
          difficulty:"medium",
          question:"Brendan Fraser starred in the following movies, except which one?",
          correct_answer:"Titanic",
          incorrect_answers:[
              "Monkeybone",
              "Encino Man",
              "Mrs. Winterbourne"
          ]
        },
        {
          category:"Entertainment: Film",
          type:"multiple",
          difficulty:"medium",
          question:"Which actor plays the role of the main antagonist in the 2011 movie &quot;Tower Heist?&quot;",
          correct_answer:"Alan Alda",
          incorrect_answers:[
              "Eddie Murphy",
              "Alec Baldwin",
              "Kevin Nealon"
          ]
        },
        {
          category:"Entertainment: Film",
          type:"multiple",
          difficulty:"medium",
          question:"Johnny Depp made his big-screen acting debut in which film?",
          correct_answer:"A Nightmare on Elm Street",
          incorrect_answers:[
              "My Bloody Valentine",
              "Halloween",
              "Friday the 13th"
          ]
        }
    ]
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly websocketService: WebsocketService) { }

  public startGame() {
    if(this.roomId) {
      this.websocketService.startGame(this.roomId);
      // this.startQuiz = true;
    }
  }

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
      this.websocketService.joinRoom(this.roomId);

    this.websocketService.getSocket().on('next-question', () => {
      console.log("hhhhhh");
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
