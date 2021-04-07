import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from "../../environments/environment";
import { ClientMethods, ServerMethods } from '../models/methods';
import { CreateRoomRequest } from '../models/request/createRoomRequest';
import { RoomCreatedResponse } from '../models/response/roomCreatedResponse';

@Injectable( {
    providedIn: 'root'
} )
export class HubService {
    private hubConnection: HubConnection | null = null;

    constructor( private router: Router ) {

    }

    public async connect () {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl( environment.hubUrl )
            .build();
        await this.hubConnection.start();

        this.hubConnection.on( ServerMethods.Welcome, ( response: any ) => {
            console.log( 'error', response );
        } );

        this.hubConnection.on( ServerMethods.Error, ( response: any ) => {
            console.log( response );
        } )

        this.hubConnection.on( ServerMethods.RoomCreated, ( response: RoomCreatedResponse ) => {
            if ( response ) {
                console.log( "RoomCreated ", response );
                this.router.navigate( [ '/lobby' ] );
            }
        } );
    }

    public async createRoom ( request: CreateRoomRequest ) {
        await this.hubConnection?.send( ClientMethods.CreateRoom, request );
    }
}