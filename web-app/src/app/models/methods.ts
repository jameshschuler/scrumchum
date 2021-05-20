export enum ClientMethods {
    CreateRoom = 'CreateRoom',
    JoinRoom = 'JoinRoom',
    LeaveRoom = 'LeaveRoom'
}

export enum ServerMethods {
    Error = 'Error',
    JoinedRoom = 'JoinedRoom',
    Welcome = 'Welcome',
    RoomCreated = 'RoomCreated',
    RoomUpdated = 'RoomUpdated'
}