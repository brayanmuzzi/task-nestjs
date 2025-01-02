import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'ID must be a valid string.' })
  id?: string;

  @ApiProperty()
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username is required.' })
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(24, { message: 'Password cannot exceed 24 characters.' })
  password: string;
}
