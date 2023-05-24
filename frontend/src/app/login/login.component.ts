import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../_services/session.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  response: undefined;

  constructor(
    private sessionService: SessionService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  //TODO: Update URL for Docker env
  login() {
    this.sessionService.login(this.username, this.password).subscribe({
      next: (data: { username: string, token: string }) => {
        const { token, username } = data;

        this.sessionService.setToken(token, username);
      }
    });
    this.router.navigateByUrl('/start');
  }

}
