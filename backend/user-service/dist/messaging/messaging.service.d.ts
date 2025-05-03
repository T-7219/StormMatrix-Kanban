import { ClientProxy } from '@nestjs/microservices';
export declare class MessagingService {
    private readonly userClient;
    private readonly notificationClient;
    private readonly logger;
    constructor(userClient: ClientProxy, notificationClient: ClientProxy);
    sendUserProfileUpdated(userId: string, profileData: any): Promise<void>;
    sendUserPreferenceChanged(userId: string, preferenceType: string, preferenceData: any): Promise<void>;
    sendNotificationToUser(userId: string, notificationType: string, data: any): Promise<void>;
}
