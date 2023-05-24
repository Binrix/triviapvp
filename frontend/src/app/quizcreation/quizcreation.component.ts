import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GameoptionService } from '../_services/gameoption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizcreation',
  templateUrl: './quizcreation.component.html',
  styleUrls: ['./quizcreation.component.scss']
})
export class QuizcreationComponent implements OnInit {
  constructor(
    private location: Location,
    private gameoptionService: GameoptionService,
    private readonly router: Router,
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
    this.gameoptionService.createLobby().subscribe({
      next: (response) => {
        this.router.navigate([`/join/${response.roomId}/true`]);
      }
    });
  }
}
