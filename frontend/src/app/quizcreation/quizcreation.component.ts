import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-quizcreation',
  templateUrl: './quizcreation.component.html',
  styleUrls: ['./quizcreation.component.scss']
})
export class QuizcreationComponent implements OnInit {

  constructor(
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

}
