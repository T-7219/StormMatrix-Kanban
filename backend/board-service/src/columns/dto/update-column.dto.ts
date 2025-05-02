import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class UpdateColumnDto {
  @ApiPropertyOptional({ example: 'In Review' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  position?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @ApiPropertyOptional({ example: 5 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1000)
  cardLimit?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  archived?: boolean;
}