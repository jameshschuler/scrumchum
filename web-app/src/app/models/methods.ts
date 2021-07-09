export enum ClientMethods {
    CreateRoom = 'CreateRoom',
    JoinRoom = 'JoinRoom',
    LeaveRoom = 'LeaveRoom',
    GetConnectedUsers = 'GetConnectedUsers'
}

export enum ServerMethods {
    Error = 'Error',
    JoinedRoom = 'JoinedRoom',
    Welcome = 'Welcome',
    RoomCreated = 'RoomCreated',
    RoomUpdated = 'RoomUpdated',
    GetConnectedUsers = 'GetConnectedUsers'
}