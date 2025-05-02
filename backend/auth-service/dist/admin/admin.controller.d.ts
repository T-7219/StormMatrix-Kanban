import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getUsers(active?: boolean, search?: string, limit?: number, offset?: number): Promise<{
        total: number;
        limit: number;
        offset: number;
        data: import("../users/entities/user.entity").User[];
    }>;
    getUserById(id: string): Promise<import("../users/entities/user.entity").User>;
    updateUser(id: string, updateData: any): Promise<import("../users/entities/user.entity").User>;
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
