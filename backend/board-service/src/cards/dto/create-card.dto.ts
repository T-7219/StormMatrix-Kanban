import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsUUID } from 'class-validator';

export class CreateCardDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsNumber()
  @IsOptional()
  position?: number;

  @IsBoolean()
  @IsOptional()
  archived?: boolean;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsUUID()
  columnId: string;
}