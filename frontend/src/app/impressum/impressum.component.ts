import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent implements OnInit {

  constructor(
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

}
