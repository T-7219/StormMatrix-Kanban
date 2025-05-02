import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, MaxLength, IsBoolean, IsArray } from 'class-validator';
import { BoardVisibility, BoardBackground } from '../entities/board.entity';

export class UpdateBoardDto {
  @ApiPropertyOptional({ description: 'The name of the board', example: 'Updated Development Roadmap' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ description: 'A description of the board', example: 'Updated description for tracking development tasks' })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Board visibility setting',
    enum: BoardVisibility,
    example: BoardVisibility.TEAM
  })
  @IsEnum(BoardVisibility)
  @IsOptional()
  visibility?: BoardVisibility;

  @ApiPropertyOptional({
    description: 'Background type (color or image)',
    enum: BoardBackground,
    example: BoardBackground.IMAGE
  })
  @IsEnum(BoardBackground)
  @IsOptional()
  backgroundType?: BoardBackground;

  @ApiPropertyOptional({ 
    description: 'Background color in hex format',
    example: '#8e44ad'
  })
  @IsString()
  @IsOptional()
  backgroundColor?: string;

  @ApiPropertyOptional({ 
    description: 'URL to background image',
    example: 'https://example.com/new-background.jpg'
  })
  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @ApiPropertyOptional({
    description: 'Whether the board is starred',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  starred?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the board is archived',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  archived?: boolean;

  @ApiPropertyOptional({ 
    description: 'List of member IDs',
    example: ['user1-id', 'user2-id']
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  memberIds?: string[];
}