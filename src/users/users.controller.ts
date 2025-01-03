import { Body, Controller, Post } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Create user in database' })
  @ApiOkResponse({ description: 'User was created.' })
  @ApiNotFoundResponse({ description: 'User cannot be created.' })
  async create(@Body() user: UserDto) {
    this.usersService.create(user);
  }
}
