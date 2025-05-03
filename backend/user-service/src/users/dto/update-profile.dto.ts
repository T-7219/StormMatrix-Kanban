import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl, IsBoolean, IsObject, MaxLength, ValidateNested } from 'class-validator';
import { NotificationChannels, UserLanguage, UserTheme } from '../entities/user.entity';
import { Type } from 'class-transformer';

export class NotificationPreferencesDto {
  @ApiPropertyOptional({ enum: NotificationChannels })
  @IsEnum(NotificationChannels)
  @IsOptional()
  assignments?: NotificationChannels;

  @ApiPropertyOptional({ enum: NotificationChannels })
  @IsEnum(NotificationChannels)
  @IsOptional()
  mentions?: NotificationChannels;

  @ApiPropertyOptional({ enum: NotificationChannels })
  @IsEnum(NotificationChannels)
  @IsOptional()
  dueDates?: NotificationChannels;

  @ApiPropertyOptional({ enum: NotificationChannels })
  @IsEnum(NotificationChannels)
  @IsOptional()
  boardInvites?: NotificationChannels;

  @ApiPropertyOptional({ enum: NotificationChannels })
  @IsEnum(NotificationChannels)
  @IsOptional()
  comments?: NotificationChannels;
}

export class UiPreferencesDto {
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  compactView?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  showDescriptionInCards?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  showLabelsInCards?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  defaultBoardView?: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'Display name of the user' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  displayName?: string;

  @ApiPropertyOptional({ description: 'User bio or description' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ description: 'URL to the user\'s avatar image' })
  @IsUrl({}, { message: 'Avatar URL must be a valid URL' })
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({ description: 'User\'s position or job title' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  position?: string;

  @ApiPropertyOptional({ description: 'User\'s company' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({ description: 'User\'s location' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ description: 'User\'s website' })
  @IsUrl({}, { message: 'Website must be a valid URL' })
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ enum: UserLanguage, description: 'User\'s preferred language' })
  @IsEnum(UserLanguage)
  @IsOptional()
  language?: UserLanguage;

  @ApiPropertyOptional({ enum: UserTheme, description: 'User\'s preferred theme' })
  @IsEnum(UserTheme)
  @IsOptional()
  theme?: UserTheme;

  @ApiPropertyOptional({ description: 'Whether the user wants to receive email notifications' })
  @IsBoolean()
  @IsOptional()
  emailNotifications?: boolean;

  @ApiPropertyOptional({ type: NotificationPreferencesDto, description: 'User\'s notification preferences' })
  @IsObject()
  @ValidateNested()
  @Type(() => NotificationPreferencesDto)
  @IsOptional()
  notificationPreferences?: NotificationPreferencesDto;

  @ApiPropertyOptional({ type: UiPreferencesDto, description: 'User\'s UI preferences' })
  @IsObject()
  @ValidateNested()
  @Type(() => UiPreferencesDto)
  @IsOptional()
  uiPreferences?: UiPreferencesDto;

  @ApiPropertyOptional({ description: 'Whether the user has completed onboarding' })
  @IsBoolean()
  @IsOptional()
  onboardingCompleted?: boolean;
}