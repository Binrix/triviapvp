import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public roomId: string | null = "";
  public players: string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.websocketService.connect();
    this.roomId = this.route.snapshot.paramMap.get('roomId');

    if(this.roomId) {
      this.websocketService.joinRoom(this.roomId);
    }

    this.websocketService.getSocket().on('player-joined', (data) => {
      this.players.push(data);
    });
  }
}
