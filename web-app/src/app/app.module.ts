import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './components/cards/cards.component';
import { CreateRoomFormComponent } from './components/create-room-form/create-room-form.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { LandingComponent } from './components/landing/landing.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { BaseUrlInterceptor } from './services/bareUrlInterceptor';
import { DataService } from './services/data.service';
import { HubService } from './services/hub.service';
import { NotificationService } from './services/notification.service';


@NgModule( {
  declarations: [
    AppComponent,
    CreateRoomFormComponent,
    NavbarComponent,
    JoinRoomComponent,
    LobbyComponent,
    LandingComponent,
    CardsComponent,
    CardComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DataService,
    HubService,
    NotificationService
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
