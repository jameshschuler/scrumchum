import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LobbyComponent } from './components/lobby/lobby.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'lobby', component: LobbyComponent },
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
