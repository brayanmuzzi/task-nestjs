import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto) {
    const userRegistered = await this.findByName(newUser.username);

    if (userRegistered) {
      throw new ConflictException(
        `User '${newUser.username}' is already registered!`,
      );
    }

    const databaseUser = new UserEntity();
    databaseUser.username = newUser.username;
    databaseUser.passwordHash = bcryptHashSync(newUser.password, 10);

    try {
      const { id, username } = await this.usersRepository.save(databaseUser);
      return { id, username };
    } catch (error) {
      console.error('Error saving user to the database:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByName(username: string): Promise<UserDto | null> {
    try {
      const userFound = await this.usersRepository.findOne({
        where: { username },
      });

      if (!userFound) {
        return null;
      }

      return {
        id: userFound.id,
        username: userFound.username,
        password: userFound.passwordHash,
      };
    } catch (error) {
      console.error('Error finding user:', error);
      throw new InternalServerErrorException('Failed to finding user');
    }
  }

  async updateUser(userId: string, updateData: Partial<UserDto>) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }

      const userRegistered = await this.findByName(updateData.username);

      if (userRegistered) {
        throw new ConflictException(
          `User '${updateData.username}' is already taken!`,
        );
      }

      if (updateData.username) {
        user.username = updateData.username;
      }

      if (updateData.password) {
        user.passwordHash = bcryptHashSync(updateData.password, 10);
      }

      await this.usersRepository.update(userId, updateData);

      const updatedUser = await this.usersRepository.findOne({
        where: { id: userId },
      });

      return {
        id: updatedUser.id,
        username: updatedUser.username,
      };
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}
