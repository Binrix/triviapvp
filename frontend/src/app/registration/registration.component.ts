import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../_services/session.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  username: string = '';
  password: string = '';


  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionService
    ) { }

  ngOnInit(): void {
  }

  changeToLogin() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.http.post<any>("URL/signup", { username: this.username, password: this.password }).subscribe(data => {
      this.sessionService.username = data.username;
      this.sessionService.token = data.token;
    })
  }

}
