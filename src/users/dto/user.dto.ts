import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class UserDto {
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

  @ApiProperty({
    type: String,
    description: `A password with at least 8 characters and a maximum of 24`,
    example: ['123456789'],
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(24, { message: 'Password cannot exceed 24 characters.' })
  password: string;
}
