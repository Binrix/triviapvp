import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../_services/websocket.service';
import { GameoptionService } from '../_services/gameoption.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  public rooms: { roomId: string, amountPlayers: number }[] = [];

  constructor(
    private readonly gameService: GameoptionService
  ) { }

  ngOnInit(): void {
    this.gameService.getLobbies().subscribe({
      next: (response) => {
        this.rooms = response;
      }
    });
  }

}
