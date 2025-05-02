import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
export declare class AdminService {
    private usersRepository;
    private configService;
    constructor(usersRepository: Repository<User>, configService: ConfigService);
    getUsers(active?: boolean, search?: string, limit?: number, offset?: number): Promise<{
        total: number;
        limit: number;
        offset: number;
        data: User[];
    }>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, updateData: Partial<User>): Promise<User>;
    deactivateUser(id: string): Promise<{
        message: string;
    }>;
    activateUser(id: string): Promise<{
        message: string;
    }>;
    getSystemSettings(): Promise<{
        smtp: {
            host: string;
            port: number;
            username: string;
            from_email: string;
            from_name: string;
        };
        telegram_bot_enabled: boolean;
        max_file_size_mb: number;
        allowed_file_types: string[];
        logo_url: string;
    }>;
}
