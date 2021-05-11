import { User } from '../user';

export interface RoomCreatedResponse {
    createdAt: string;
    roomCode: string;
    createdBy: User;
}