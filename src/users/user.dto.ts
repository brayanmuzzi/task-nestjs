import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Username should not be empty' })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @Min(8)
  @Max(24)
  password: string;
}
