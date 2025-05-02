import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Verify2faDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;

  @ApiProperty({ example: 'temporary_token_from_login' })
  @IsString()
  @IsNotEmpty()
  sessionToken: string;

  @ApiProperty({ example: 'user_uuid', required: false })
  @IsString()
  @IsNotEmpty()
  userId: string;
}