import { Injectable } from '@angular/core';
import { Quiz } from '../shared/interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  lobbyUrl: String = '';
  quizContent: [any] = [{}];
  round: number = 0;

  public quiz: Quiz =
  {
    response_code: 0,
    results:[
       {
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "medium",
          question: "In the movie The Iron Giant this character is the protagonist.",
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

  constructor() { }
}
