import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class GetUsersByIdsDto {
  @ApiProperty({ 
    description: 'Array of user IDs to fetch profiles for',
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001']
  })
  @IsArray()
  @IsUUID(4, { each: true })
  userIds: string[];
}