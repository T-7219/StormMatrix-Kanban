import { UsersService } from '../users/users.service';
export declare class MessagingController {
    private readonly usersService;
    private readonly logger;
    constructor(usersService: UsersService);
    handleUserCreated(data: any): Promise<void>;
    handleUserUpdated(data: any): Promise<void>;
    handleUserDeleted(data: any): Promise<void>;
}
