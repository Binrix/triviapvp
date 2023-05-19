import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public roomId: string | null = "";

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    console.log(this.roomId);
  }

}
