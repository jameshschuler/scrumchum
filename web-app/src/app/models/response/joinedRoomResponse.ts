import { User } from '../user';

export interface JoinedRoomResponse {
    createdAt: string;
    createdBy: User;
    roomCode: string;
}