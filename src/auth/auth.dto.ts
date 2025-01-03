import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    type: String,
    description: `One token to authorization`,
    example: ['token'],
  })
  token: string;

  @ApiProperty({
    type: Number,
    description: `Time for token to expire`,
    example: ['3600'],
  })
  expiresIn: number;
}
