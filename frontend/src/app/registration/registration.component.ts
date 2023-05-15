import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  username: string = '';
  password: string = '';


  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  register() {
    this.http.post<any>("URL/signup", { username: this.username, password: this.password }).subscribe(data => {
      this.sessionService.username = data.username;
      this.sessionService.token = data.token;
    })
  }

}
