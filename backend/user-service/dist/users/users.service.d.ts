export declare class UsersService {
    findUserProfile(userId: string): Promise<{
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        createdAt: string;
        updatedAt: string;
    }>;
}
