import { BadRequestException, Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserProfile, UserLanguage, UserTheme, NotificationChannels } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SavedFilterDto } from './dto/saved-filter.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateProfileDto } from './dto/create-profile.dto';
import { MessagingService } from '../messaging/messaging.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @Inject(forwardRef(() => MessagingService))
    private readonly messagingService?: MessagingService
  ) {}

  /**
   * Get a user profile by userId
   * @param userId The ID of the user from auth service
   */
  async getUserProfile(userId: string): Promise<UserProfile> {
    let profile = await this.userProfileRepository.findOne({ where: { userId } });
    
    // Create default profile if none exists
    if (!profile) {
      profile = await this.createDefaultProfile(userId);
    }
    
    return profile;
  }

  /**
   * Create a default profile for a new user
   * @param userId The ID of the user from auth service
   */
  private async createDefaultProfile(userId: string): Promise<UserProfile> {
    const newProfile = this.userProfileRepository.create({
      userId,
      language: UserLanguage.EN,
      theme: UserTheme.SYSTEM,
      emailNotifications: true,
      notificationPreferences: {
        assignments: NotificationChannels.EMAIL,
        mentions: NotificationChannels.EMAIL,
        dueDates: NotificationChannels.EMAIL,
        boardInvites: NotificationChannels.EMAIL,
        comments: NotificationChannels.IN_APP,
      },
      uiPreferences: {
        compactView: false,
        showDescriptionInCards: true,
        showLabelsInCards: true,
        defaultBoardView: 'kanban',
      },
      savedFilters: [],
      onboardingCompleted: false,
    });

    return this.userProfileRepository.save(newProfile);
  }

  /**
   * Update a user's profile
   * @param userId The ID of the user from auth service
   * @param updateProfileDto The profile data to update
   */
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<UserProfile> {
    const profile = await this.getUserProfile(userId);
    
    // Update profile with provided data
    Object.assign(profile, updateProfileDto);
    
    const updatedProfile = await this.userProfileRepository.save(profile);
    
    // Notify other services about profile update
    if (this.messagingService) {
      await this.messagingService.sendUserProfileUpdated(userId, {
        displayName: updatedProfile.displayName,
        avatarUrl: updatedProfile.avatarUrl,
        language: updatedProfile.language
      });
    }
    
    return updatedProfile;
  }

  /**
   * Add or update a saved filter
   * @param userId The ID of the user from auth service
   * @param savedFilterDto The filter to save
   */
  async saveFilter(userId: string, savedFilterDto: SavedFilterDto): Promise<UserProfile> {
    const profile = await this.getUserProfile(userId);
    const savedFilters = [...profile.savedFilters];
    
    if (savedFilterDto.id) {
      // Update existing filter
      const filterIndex = savedFilters.findIndex(filter => filter.id === savedFilterDto.id);
      
      if (filterIndex === -1) {
        throw new NotFoundException(`Filter with ID ${savedFilterDto.id} not found`);
      }
      
      savedFilters[filterIndex] = {
        ...savedFilters[filterIndex],
        name: savedFilterDto.name,
        filter: savedFilterDto.filter
      };
    } else {
      // Add new filter
      savedFilters.push({
        id: uuidv4(),
        name: savedFilterDto.name,
        filter: savedFilterDto.filter
      });
    }
    
    profile.savedFilters = savedFilters;
    return this.userProfileRepository.save(profile);
  }

  /**
   * Delete a saved filter
   * @param userId The ID of the user from auth service
   * @param filterId The ID of the filter to delete
   */
  async deleteFilter(userId: string, filterId: string): Promise<UserProfile> {
    const profile = await this.getUserProfile(userId);
    const savedFilters = profile.savedFilters;
    
    const filterIndex = savedFilters.findIndex(filter => filter.id === filterId);
    
    if (filterIndex === -1) {
      throw new NotFoundException(`Filter with ID ${filterId} not found`);
    }
    
    profile.savedFilters = savedFilters.filter(filter => filter.id !== filterId);
    return this.userProfileRepository.save(profile);
  }

  /**
   * Upload user avatar
   * @param userId The ID of the user from auth service
   * @param avatarUrl URL to the avatar image
   */
  async updateAvatar(userId: string, avatarUrl: string): Promise<UserProfile> {
    const profile = await this.getUserProfile(userId);
    profile.avatarUrl = avatarUrl;
    const updatedProfile = await this.userProfileRepository.save(profile);
    
    // Notify other services about avatar update
    if (this.messagingService) {
      await this.messagingService.sendUserProfileUpdated(userId, {
        avatarUrl: updatedProfile.avatarUrl
      });
    }
    
    return updatedProfile;
  }

  /**
   * Update user language preference
   * @param userId The ID of the user from auth service
   * @param language The language code
   */
  async updateLanguage(userId: string, language: UserLanguage): Promise<UserProfile> {
    if (!Object.values(UserLanguage).includes(language)) {
      throw new BadRequestException(`Invalid language: ${language}`);
    }

    const profile = await this.getUserProfile(userId);
    profile.language = language;
    const updatedProfile = await this.userProfileRepository.save(profile);
    
    // Notify other services about language preference change
    if (this.messagingService) {
      await this.messagingService.sendUserPreferenceChanged(userId, 'language', {
        language: updatedProfile.language
      });
    }
    
    return updatedProfile;
  }

  /**
   * Update user theme preference
   * @param userId The ID of the user from auth service
   * @param theme The theme name
   */
  async updateTheme(userId: string, theme: UserTheme): Promise<UserProfile> {
    if (!Object.values(UserTheme).includes(theme)) {
      throw new BadRequestException(`Invalid theme: ${theme}`);
    }

    const profile = await this.getUserProfile(userId);
    profile.theme = theme;
    const updatedProfile = await this.userProfileRepository.save(profile);
    
    // Notify other services about theme preference change
    if (this.messagingService) {
      await this.messagingService.sendUserPreferenceChanged(userId, 'theme', {
        theme: updatedProfile.theme
      });
    }
    
    return updatedProfile;
  }

  /**
   * Complete user onboarding
   * @param userId The ID of the user from auth service
   */
  async completeOnboarding(userId: string): Promise<UserProfile> {
    const profile = await this.getUserProfile(userId);
    profile.onboardingCompleted = true;
    const updatedProfile = await this.userProfileRepository.save(profile);
    
    // Notify other services about onboarding completion
    if (this.messagingService) {
      await this.messagingService.sendUserProfileUpdated(userId, {
        onboardingCompleted: true
      });
      
      // Send a welcome notification to the user
      await this.messagingService.sendNotificationToUser(userId, 'onboarding_completed', {
        message: 'Welcome to StormMatrix Kanban! Your onboarding is now complete.'
      });
    }
    
    return updatedProfile;
  }

  /**
   * Get multiple user profiles by user IDs
   * @param userIds Array of user IDs
   */
  async getUserProfilesByIds(userIds: string[]): Promise<UserProfile[]> {
    return this.userProfileRepository.find({
      where: {
        userId: In(userIds),
      },
    });
  }

  /**
   * Create a user profile during user registration
   * @param createProfileDto Data for new user profile
   */
  async createUserProfile(createProfileDto: CreateProfileDto): Promise<UserProfile> {
    // Check if profile already exists
    const existingProfile = await this.userProfileRepository.findOne({
      where: { userId: createProfileDto.userId }
    });

    if (existingProfile) {
      throw new BadRequestException(`Profile for user ${createProfileDto.userId} already exists`);
    }

    const newProfile = this.userProfileRepository.create({
      userId: createProfileDto.userId,
      displayName: createProfileDto.displayName || createProfileDto.email.split('@')[0],
      language: createProfileDto.language || UserLanguage.EN,
      theme: UserTheme.SYSTEM,
      emailNotifications: true,
      notificationPreferences: {
        assignments: NotificationChannels.EMAIL,
        mentions: NotificationChannels.EMAIL,
        dueDates: NotificationChannels.EMAIL,
        boardInvites: NotificationChannels.EMAIL,
        comments: NotificationChannels.IN_APP,
      },
      uiPreferences: {
        compactView: false,
        showDescriptionInCards: true,
        showLabelsInCards: true,
        defaultBoardView: 'kanban',
      },
      savedFilters: [],
      onboardingCompleted: false,
    });

    const createdProfile = await this.userProfileRepository.save(newProfile);
    
    // Notify other services about new user profile
    if (this.messagingService) {
      await this.messagingService.sendUserProfileUpdated(createProfileDto.userId, {
        displayName: createdProfile.displayName,
        language: createdProfile.language
      });
      
      // Send a welcome notification to the user
      await this.messagingService.sendNotificationToUser(createProfileDto.userId, 'profile_created', {
        message: 'Welcome to StormMatrix Kanban! Your profile has been created.'
      });
    }
    
    return createdProfile;
  }
}