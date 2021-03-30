import { Injectable } from '@angular/core';
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

    constructor() {

    }

    public async connect () {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl( environment.hubUrl )
            .build();
        await this.hubConnection.start();

        this.hubConnection.on( ServerMethods.Welcome, ( response: any ) => {
            console.log( response );
        } );

        this.hubConnection.on( ServerMethods.RoomCreated, ( response: RoomCreatedResponse ) => {
            console.log( response );
        } );
    }

    public async createRoom ( request: CreateRoomRequest ) {
        await this.hubConnection?.send( ClientMethods.CreateRoom, request );
    }
}