import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRoomFormComponent } from './components/create-room-form/create-room-form.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HubService } from './services/hub.service';


@NgModule( {
  declarations: [
    AppComponent,
    CreateRoomFormComponent,
    NavbarComponent,
    JoinRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    HubService
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
