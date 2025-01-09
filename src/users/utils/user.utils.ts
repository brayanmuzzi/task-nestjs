import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

export const userExists = async (
  username: string,
  usersRepository: Repository<UserEntity>,
): Promise<boolean> => {
  const user = await usersRepository.findOne({ where: { username } });
  return !!user;
};
