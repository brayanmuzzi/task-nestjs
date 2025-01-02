import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: `One token to authorization`,
    example: ['token'],
  })
  token: string;

  @ApiProperty({
    description: `Time for token to expire`,
    example: ['3600'],
  })
  expiresIn: number;
}
