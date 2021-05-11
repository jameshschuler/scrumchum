import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { HubService } from 'src/app/services/hub.service';

@Component( {
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: [ './lobby.component.scss' ]
} )
export class LobbyComponent implements OnInit {
  public currentTab = 'items';
  public users: User[] = [];

  constructor( private hubService: HubService, private router: Router ) { }

  ngOnInit (): void {
    if ( this.hubService.currentUser.value === null ) {
      this.router.navigate( [ '/' ] );
    }

    console.log( 'hello' );
    this.hubService.participants.subscribe( ( users: User[] ) => {
      console.log( 'data', users );
      this.users = users;
    } )
  }

  changeTab ( tab: string ) {
    this.currentTab = tab;
  }
}
