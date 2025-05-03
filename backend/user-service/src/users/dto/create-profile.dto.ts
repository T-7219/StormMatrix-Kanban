import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserLanguage } from '../entities/user.entity';

export class CreateProfileDto {
  @ApiProperty({ description: 'User ID from the Auth service' })
  @IsUUID(4)
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ description: 'User display name' })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiPropertyOptional({ enum: UserLanguage, default: UserLanguage.EN, description: 'User preferred language' })
  @IsOptional()
  language?: UserLanguage;
}