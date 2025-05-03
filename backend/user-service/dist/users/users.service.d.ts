import { Repository } from 'typeorm';
import { UserProfile, UserLanguage, UserTheme } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SavedFilterDto } from './dto/saved-filter.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { MessagingService } from '../messaging/messaging.service';
export declare class UsersService {
    private userProfileRepository;
    private readonly messagingService?;
    constructor(userProfileRepository: Repository<UserProfile>, messagingService?: MessagingService);
    getUserProfile(userId: string): Promise<UserProfile>;
    private createDefaultProfile;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<UserProfile>;
    saveFilter(userId: string, savedFilterDto: SavedFilterDto): Promise<UserProfile>;
    deleteFilter(userId: string, filterId: string): Promise<UserProfile>;
    updateAvatar(userId: string, avatarUrl: string): Promise<UserProfile>;
    updateLanguage(userId: string, language: UserLanguage): Promise<UserProfile>;
    updateTheme(userId: string, theme: UserTheme): Promise<UserProfile>;
    completeOnboarding(userId: string): Promise<UserProfile>;
    getUserProfilesByIds(userIds: string[]): Promise<UserProfile[]>;
    createUserProfile(createProfileDto: CreateProfileDto): Promise<UserProfile>;
}
