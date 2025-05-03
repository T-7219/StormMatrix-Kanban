import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class SavedFilterDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Name of the saved filter' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Filter configuration', type: 'object' })
  @IsObject()
  filter: Record<string, any>;
}

export class DeleteFilterDto {
  @ApiProperty({ description: 'ID of the filter to delete' })
  @IsUUID()
  id: string;
}