import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public roomId: string | null = "";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.websocketService.connect();
    this.roomId = this.route.snapshot.paramMap.get('roomId');

    if(this.roomId) {
      this.websocketService.joinRoom(this.roomId);
    }

    console.log(this.roomId);
  }

}
