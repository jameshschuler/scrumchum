import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  title = 'Scrumchum';
  currentTab = 'create';

  changeTab ( tab: string ) {
    this.currentTab = tab;
  }

  ngOnInit (): void {
    console.log( 'make connection to server here?' );

    const connect = async () => {
      let connection = new HubConnectionBuilder()
        .withUrl( "https://localhost:5001/scrumchum" )
        .build();

      // connection.on( "send", data => {
      //   console.log( data );
      // } );

      await connection.start();
    }

    connect();
  }
}
