import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(): {
        message: string;
        status: string;
        timestamp: string;
    };
}
