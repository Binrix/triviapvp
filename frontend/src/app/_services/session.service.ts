import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  username: string = '';
  token: string = '';

  constructor() { }
}
