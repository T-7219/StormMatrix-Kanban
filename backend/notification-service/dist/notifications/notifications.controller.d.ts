import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(): {
        message: string;
        status: string;
        timestamp: string;
    };
    getUnreadCount(): {
        unreadCount: number;
        message: string;
        status: string;
        timestamp: string;
    };
    markAsRead(id: string): {
        id: string;
        read: boolean;
        message: string;
        status: string;
        timestamp: string;
    };
    markAllAsRead(): {
        success: boolean;
        message: string;
        status: string;
        timestamp: string;
    };
}
