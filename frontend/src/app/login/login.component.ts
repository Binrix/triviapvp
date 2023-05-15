import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../_services/session.service';

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
    private router: Router, 
    private http: HttpClient,
    private sessionService: SessionService
    ) { }

  ngOnInit(): void {
  }

  changeToRegistration() {
    this.router.navigateByUrl('/registration');
  }

  //TODO: Update URL for Docker env
  login() {
    this.http.post<any>("URL/login", { username: this.username, password: this.password }).subscribe(data => {
      this.sessionService.username = data.username;
      this.sessionService.token = data.token;
    })
  }

}
