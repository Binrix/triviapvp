import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  username: string = '';
  password: string = '';


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

  register() {
    this.sessionService.signUp(this.username, this.password).subscribe({
      next: (data: { username: string, token: string }) => {
        const { token } = data;

        this.sessionService.setToken(token);
      }
    });
    this.router.navigateByUrl('/start');
  }
}
