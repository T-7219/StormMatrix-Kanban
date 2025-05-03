import { NotificationChannels, UserLanguage, UserTheme } from '../entities/user.entity';
export declare class NotificationPreferencesDto {
    assignments?: NotificationChannels;
    mentions?: NotificationChannels;
    dueDates?: NotificationChannels;
    boardInvites?: NotificationChannels;
    comments?: NotificationChannels;
}
export declare class UiPreferencesDto {
    compactView?: boolean;
    showDescriptionInCards?: boolean;
    showLabelsInCards?: boolean;
    defaultBoardView?: string;
}
export declare class UpdateProfileDto {
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
    position?: string;
    company?: string;
    location?: string;
    website?: string;
    language?: UserLanguage;
    theme?: UserTheme;
    emailNotifications?: boolean;
    notificationPreferences?: NotificationPreferencesDto;
    uiPreferences?: UiPreferencesDto;
    onboardingCompleted?: boolean;
}
