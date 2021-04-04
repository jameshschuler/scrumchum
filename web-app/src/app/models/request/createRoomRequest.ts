import { User } from '../user';
import { UserType } from '../userType';

export interface CreateRoomRequest {
    cardsetId: number;
    user: User;
    roomCode: string;
    userType: UserType;
}