import { Controller, Logger, Inject, forwardRef } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UsersService } from '../users/users.service';

@Controller()
export class MessagingController {
  private readonly logger = new Logger(MessagingController.name);

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {}

  @EventPattern('user_created')
  async handleUserCreated(@Payload() data: any) {
    try {
      this.logger.log(`Received user_created event: ${JSON.stringify(data)}`);
      
      // Create user profile when user is created in auth service
      await this.usersService.createUserProfile({
        userId: data.userId,
        email: data.email,
        displayName: data.name || data.email.split('@')[0],
        language: data.language || undefined
      });
      
      this.logger.log(`Created profile for user ${data.userId}`);
    } catch (error) {
      this.logger.error(`Error handling user_created event: ${error.message}`, error.stack);
    }
  }

  @EventPattern('user_updated')
  async handleUserUpdated(@Payload() data: any) {
    try {
      this.logger.log(`Received user_updated event: ${JSON.stringify(data)}`);
      
      // Get existing profile
      const profile = await this.usersService.getUserProfile(data.userId);
      
      // Update only specific fields that should be synchronized from auth service
      if (profile) {
        const updateData: any = {};
        
        // Only update displayName if it's empty in profile but available in auth service
        if (!profile.displayName && data.name) {
          updateData.displayName = data.name;
        }
        
        // Only update if there are fields to update
        if (Object.keys(updateData).length > 0) {
          await this.usersService.updateProfile(data.userId, updateData);
          this.logger.log(`Updated profile for user ${data.userId}`);
        }
      }
    } catch (error) {
      this.logger.error(`Error handling user_updated event: ${error.message}`, error.stack);
    }
  }

  @EventPattern('user_deleted')
  async handleUserDeleted(@Payload() data: any) {
    try {
      this.logger.log(`Received user_deleted event for user ${data.userId}`);
      
      // In a real system, you might want to archive the profile instead of deleting it
      // For now, we'll just log the event
      this.logger.log(`User ${data.userId} has been deleted in auth service. Consider archiving their profile.`);
    } catch (error) {
      this.logger.error(`Error handling user_deleted event: ${error.message}`, error.stack);
    }
  }
}