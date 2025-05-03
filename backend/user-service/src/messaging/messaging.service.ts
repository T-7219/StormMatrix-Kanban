import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
  ) {}

  /**
   * Send notification about user profile update
   */
  async sendUserProfileUpdated(userId: string, profileData: any): Promise<void> {
    try {
      this.userClient.emit('user_profile_updated', {
        userId,
        profileData,
        timestamp: new Date().toISOString(),
      });
      
      this.logger.log(`Sent user_profile_updated event for user ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to emit user_profile_updated: ${error.message}`, error.stack);
    }
  }

  /**
   * Send notification about user preference change
   */
  async sendUserPreferenceChanged(userId: string, preferenceType: string, preferenceData: any): Promise<void> {
    try {
      this.userClient.emit('user_preference_changed', {
        userId,
        preferenceType,
        preferenceData,
        timestamp: new Date().toISOString(),
      });
      
      this.logger.log(`Sent user_preference_changed event for user ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to emit user_preference_changed: ${error.message}`, error.stack);
    }
  }

  /**
   * Send notification to user
   */
  async sendNotificationToUser(userId: string, notificationType: string, data: any): Promise<void> {
    try {
      this.notificationClient.emit('send_notification', {
        userId,
        type: notificationType,
        data,
        timestamp: new Date().toISOString(),
      });
      
      this.logger.log(`Sent notification to user ${userId} of type ${notificationType}`);
    } catch (error) {
      this.logger.error(`Failed to send notification: ${error.message}`, error.stack);
    }
  }
}