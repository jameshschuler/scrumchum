import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../environments/environment";
import { ClientMethods, ServerMethods } from '../models/methods';
import { CreateRoomRequest } from '../models/request/createRoomRequest';
import { JoinRoomRequest } from '../models/request/joinRoomRequest';
import { LeaveRoomRequest } from '../models/request/leaveRoomRequest';
import { JoinedRoomResponse } from '../models/response/joinedRoomResponse';
import { RoomCreatedResponse } from '../models/response/roomCreatedResponse';
import { UserJoinedResponse } from '../models/response/userJoinedResponse';
import { User } from '../models/user';

@Injectable( {
    providedIn: 'root'
} )
export class HubService {
    private hubConnection: HubConnection | null = null;

    public currentUser = new BehaviorSubject<User | null>( null );
    public participants = new BehaviorSubject<User[]>( [] );

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

        this.hubConnection.on( ServerMethods.UserJoined, ( response: UserJoinedResponse ) => {
            console.log( 'UserJoined ', response );
            this.participants.next( response.participants );
        } )

        this.hubConnection.on( ServerMethods.RoomCreated, ( response: RoomCreatedResponse ) => {
            if ( response ) {
                console.log( "RoomCreated ", response );
                this.currentUser.next( response.createdBy );
                this.router.navigate( [ '/lobby' ] );
            }
        } );

        this.hubConnection.on( ServerMethods.JoinedRoom, ( response: JoinedRoomResponse ) => {
            if ( response ) {
                console.log( "JoinedRoom ", response );
                this.currentUser.next( response.createdBy );
                this.router.navigate( [ '/lobby' ] );
            }
        } );
    }

    public async createRoom ( request: CreateRoomRequest ) {
        await this.hubConnection?.send( ClientMethods.CreateRoom, request );
    }

    public async joinRoom ( request: JoinRoomRequest ) {
        await this.hubConnection?.send( ClientMethods.JoinRoom, request );
    }

    public async leaveRoom ( request: LeaveRoomRequest ) {
        await this.hubConnection?.send( ClientMethods.LeaveRoom, request );
    }
}