import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user in database' })
  @ApiOkResponse({ description: 'User was created.' })
  @ApiNotFoundResponse({ description: 'User cannot be created.' })
  async create(@Body() user: UserDto) {
    try {
      const result = await this.usersService.create(user);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Unexpected error occurred while fetching the resource',
          details: error.message,
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
