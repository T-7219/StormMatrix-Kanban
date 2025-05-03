import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum UserLanguage {
  EN = 'en',
  RU = 'ru',
  DE = 'de',
}

export enum UserTheme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum NotificationChannels {
  EMAIL = 'email',
  IN_APP = 'in_app',
  NONE = 'none',
}

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: true, length: 255 })
  displayName: string;

  @Column({ nullable: true, length: 1000 })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true, length: 255 })
  position: string;

  @Column({ nullable: true, length: 255 })
  company: string;

  @Column({ nullable: true, length: 255 })
  location: string;

  @Column({ nullable: true, length: 255 })
  website: string;

  @Column({ default: UserLanguage.EN, type: 'enum', enum: UserLanguage })
  language: UserLanguage;

  @Column({ default: UserTheme.SYSTEM, type: 'enum', enum: UserTheme })
  theme: UserTheme;

  @Column({ default: false })
  emailNotifications: boolean;

  @Column({ type: 'json', default: {} })
  notificationPreferences: {
    assignments?: NotificationChannels;
    mentions?: NotificationChannels;
    dueDates?: NotificationChannels;
    boardInvites?: NotificationChannels;
    comments?: NotificationChannels;
  };

  @Column({ type: 'json', default: {} })
  uiPreferences: {
    compactView?: boolean;
    showDescriptionInCards?: boolean;
    showLabelsInCards?: boolean;
    defaultBoardView?: string;
  };

  @Column({ type: 'json', default: [] })
  savedFilters: Array<{
    id: string;
    name: string;
    filter: Record<string, any>;
  }>;

  @Column({ default: false })
  onboardingCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}