import { Component, OnInit } from '@angular/core';
import { HubService } from './services/hub.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  constructor( private hubService: HubService ) {
    this.hubService.connect();
  }

  ngOnInit (): void {

  }
}
