import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: [ './landing.component.scss' ]
} )
export class LandingComponent implements OnInit {
  title = 'Scrumchum';
  currentTab = 'create';

  constructor() {

  }

  ngOnInit (): void {
  }

  changeTab ( tab: string ) {
    this.currentTab = tab;
  }
}
