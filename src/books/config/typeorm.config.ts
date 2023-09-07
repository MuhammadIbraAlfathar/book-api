import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Book } from '../entity/books.entity';
import { RefreshTokenRepository } from 'src/auth/repository/refresh-token.repository';
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'books',
  entities: [User, Book, RefreshToken],
  synchronize: true,
};
