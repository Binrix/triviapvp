import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GameoptionService } from '../_services/gameoption.service';

@Component({
  selector: 'app-quizcreation',
  templateUrl: './quizcreation.component.html',
  styleUrls: ['./quizcreation.component.scss']
})
export class QuizcreationComponent implements OnInit {

  selectedSubject: String = '';

  constructor(
    private location: Location,
    private gameoptionService: GameoptionService
    ) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  onCheckChange(event: any) {
    this.gameoptionService.difficulty = event.target.value;
  }

  onSelectChange(event: any) {
    this.gameoptionService.subject = event.target.value;
  }

  startGame() {
    this.gameoptionService.startGame();
  }
}
