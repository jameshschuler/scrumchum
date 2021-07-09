import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../environments/environment";
import { ClientMethods, ServerMethods } from '../models/methods';
import { CreateRoomRequest } from '../models/request/createRoomRequest';
import { JoinRoomRequest } from '../models/request/joinRoomRequest';
import { LeaveRoomRequest } from '../models/request/leaveRoomRequest';
import { ErrorResponse } from '../models/response/errorResponse';
import { GetConnectedUsersResponse } from '../models/response/getConnectedUsersResponse';
import { JoinedRoomResponse } from '../models/response/joinedRoomResponse';
import { RoomCreatedResponse } from '../models/response/roomCreatedResponse';
import { User } from '../models/user';
import { NotificationService } from './notification.service';

@Injectable( {
    providedIn: 'root'
} )
export class HubService {
    private hubConnection: HubConnection | null = null;

    public currentUser = new BehaviorSubject<User | null>( null );
    public participants = new BehaviorSubject<User[]>( [] );
    public roomCode: string | null = null;

    constructor( private notificationService: NotificationService, private router: Router ) {

    }

    public async connect () {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl( environment.hubUrl )
            .build();
        await this.hubConnection.start();

        this.hubConnection.on( ServerMethods.Welcome, ( response: any ) => {
            console.log( 'error', response );
        } );

        this.hubConnection.on( ServerMethods.Error, ( response: ErrorResponse ) => {
            console.log( response );
            this.notificationService.error( response.message, { autoClose: true, isOverlay: true } );
        } );

        // Create Room
        this.hubConnection.on( ServerMethods.RoomCreated, ( response: RoomCreatedResponse ) => {
            if ( response ) {
                this.roomCode = response.roomCode;
                this.currentUser.next( response.createdBy );
                this.router.navigate( [ '/lobby' ] );
            }
        } );

        // Join Room
        this.hubConnection.on( ServerMethods.JoinedRoom, ( response: JoinedRoomResponse ) => {
            if ( response ) {
                console.log( "JoinedRoom ", response );
                this.roomCode = response.roomCode;
                this.currentUser.next( response.createdBy );
                this.router.navigate( [ '/lobby' ] );
            }
        } );

        // Get Connected Users
        this.hubConnection.on( ServerMethods.GetConnectedUsers, ( response: GetConnectedUsersResponse ) => {
            this.participants.next( response.participants );
        } )
    }

    public async getConnectedUsers ( roomCode: string ) {
        await this.hubConnection?.send( ClientMethods.GetConnectedUsers, roomCode );
    }

    public async createRoom ( request: CreateRoomRequest ) {
        await this.hubConnection?.send( ClientMethods.CreateRoom, request );
    }

    public async joinRoom ( request: JoinRoomRequest ) {
        await this.hubConnection?.send( ClientMethods.JoinRoom, request );
    }

    public async leaveRoom () {
        const request = {
            roomCode: this.roomCode,
            name: this.currentUser.value?.name
        } as LeaveRoomRequest;

        await this.hubConnection?.send( ClientMethods.LeaveRoom, request );

        this.roomCode = null;
        this.currentUser.next( null );
        this.participants.next( [] );
    }
}