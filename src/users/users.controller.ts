import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
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
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Error creating user:', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected error occurred while creating the user',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Update user in database' })
  @ApiOkResponse({ description: 'User was updated.' })
  @ApiNotFoundResponse({ description: 'User cannot be updated.' })
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<UserDto>,
  ) {
    return this.usersService.updateUser(id, updateData);
  }
}
