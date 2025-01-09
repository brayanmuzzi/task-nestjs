import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class UserResponseDto {
  @ApiProperty({
    type: String,
    description: `A user id`,
    example: ['id'],
  })
  @IsOptional()
  @IsString({ message: 'ID must be a valid string.' })
  @IsUUID('4', { message: 'ID must be a valid UUID version 4.' })
  id?: string;

  @ApiProperty({
    type: String,
    description: `A username`,
    example: ['username'],
  })
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username is required.' })
  @MinLength(3, { message: 'Password must be at least 3 characters long.' })
  @MaxLength(24, { message: 'Password cannot exceed 24 characters.' })
  username: string;
}
