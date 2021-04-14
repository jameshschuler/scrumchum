import { User } from '../user';
import { UserType } from '../userType';

export interface JoinRoomRequest {
    user: User;
    roomCode: string;
    userType: UserType;
}