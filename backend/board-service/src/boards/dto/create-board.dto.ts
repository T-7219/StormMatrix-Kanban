import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { BoardVisibility, BoardBackground } from '../entities/board.entity';

export class CreateBoardDto {
  @ApiProperty({ example: 'Development Roadmap' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Board for tracking development tasks and milestones' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: BoardVisibility, default: BoardVisibility.PRIVATE })
  @IsEnum(BoardVisibility)
  visibility: BoardVisibility = BoardVisibility.PRIVATE;

  @ApiProperty({ enum: BoardBackground, default: BoardBackground.COLOR })
  @IsEnum(BoardBackground)
  @IsOptional()
  backgroundType?: BoardBackground = BoardBackground.COLOR;

  @ApiPropertyOptional({ example: '#0079bf' })
  @IsString()
  @IsOptional()
  backgroundColor?: string;

  @ApiPropertyOptional({ example: 'https://example.com/background.jpg' })
  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @ApiPropertyOptional({ example: ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  initialColumns?: string[];
}