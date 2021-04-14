import { UserType } from './userType';

export class CreateRoomFormModel {
    constructor( public name: string, public roomCode: string, public cardsetId: number, public userType: UserType ) { }
}

export class JoinRoomFormModel {
    constructor( public name: string, public roomCode: string, public userType: UserType ) {

    }
}