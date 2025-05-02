export declare class NotificationsService {
    findAll(): Promise<{
        id: string;
        userId: string;
        message: string;
        read: boolean;
        createdAt: string;
    }[]>;
    countUnread(): Promise<{
        count: number;
    }>;
    markAsRead(id: string): Promise<{
        id: string;
        read: boolean;
        updatedAt: string;
    }>;
    markAllAsRead(): Promise<{
        success: boolean;
        count: number;
        updatedAt: string;
    }>;
}
