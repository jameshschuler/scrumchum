import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: [ './lobby.component.scss' ]
} )
export class LobbyComponent implements OnInit {
  public currentTab = 'items';

  constructor() { }

  ngOnInit (): void {
    console.log( 'hello' )
  }

  changeTab ( tab: string ) {
    this.currentTab = tab;
  }
}
