import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from "../../environments/environment";
import { ClientMethods, ServerMethods } from '../models/methods';
import { CreateRoomRequest } from '../models/request/createRoomRequest';
import { JoinRoomRequest } from '../models/request/joinRoomRequest';
import { JoinedRoomResponse } from '../models/response/joinedRoomResponse';
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
        } );

        this.hubConnection.on( ServerMethods.UserJoined, ( response: any ) => {
            console.log( 'UserJoined ', response );
            // TODO: create observable that component can sub to
        } )

        this.hubConnection.on( ServerMethods.RoomCreated, ( response: RoomCreatedResponse ) => {
            if ( response ) {
                console.log( "RoomCreated ", response );
                // TODO: pass response to lobby component
                this.router.navigate( [ '/lobby' ] );
            }
        } );

        this.hubConnection.on( ServerMethods.JoinedRoom, ( response: JoinedRoomResponse ) => {
            if ( response ) {
                // TODO: pass response to lobby component
                console.log( "JoinedRoom ", response );
                this.router.navigate( [ '/lobby' ] );
            }
        } );
    }

    public async createRoom ( request: CreateRoomRequest ) {
        await this.hubConnection?.send( ClientMethods.CreateRoom, request );
    }

    public async joinRoom ( request: JoinRoomRequest ) {
        console.log( request )
        await this.hubConnection?.send( ClientMethods.JoinRoom, request );
    }
}