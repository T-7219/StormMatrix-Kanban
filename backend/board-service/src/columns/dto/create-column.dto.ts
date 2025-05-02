import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ example: 'In Progress' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  position?: number;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1000)
  cardLimit?: number;

  @ApiProperty({ example: 'board-uuid' })
  @IsString()
  @IsNotEmpty()
  boardId: string;
}