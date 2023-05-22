import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  public isAuthorized = false;

  constructor(
    private readonly sessionService: SessionService
  ) { }

  public logout() {
    this.sessionService.logout();
    window.location.reload();
  }

  ngOnInit(): void {
    this.isAuthorized = this.sessionService.isAuthorized();
    console.log(this.isAuthorized);
  }
}
