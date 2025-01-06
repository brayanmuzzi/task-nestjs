import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

    const { id, username } = await this.usersRepository.save(databaseUser);

    return { id, username };
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
    }
  }
}
