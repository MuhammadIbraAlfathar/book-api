import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfigs: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'book-api',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
};
