export declare enum UserLanguage {
    EN = "en",
    RU = "ru",
    DE = "de"
}
export declare enum UserTheme {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system"
}
export declare enum NotificationChannels {
    EMAIL = "email",
    IN_APP = "in_app",
    NONE = "none"
}
export declare class UserProfile {
    id: string;
    userId: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    position: string;
    company: string;
    location: string;
    website: string;
    language: UserLanguage;
    theme: UserTheme;
    emailNotifications: boolean;
    notificationPreferences: {
        assignments?: NotificationChannels;
        mentions?: NotificationChannels;
        dueDates?: NotificationChannels;
        boardInvites?: NotificationChannels;
        comments?: NotificationChannels;
    };
    uiPreferences: {
        compactView?: boolean;
        showDescriptionInCards?: boolean;
        showLabelsInCards?: boolean;
        defaultBoardView?: string;
    };
    savedFilters: Array<{
        id: string;
        name: string;
        filter: Record<string, any>;
    }>;
    onboardingCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
