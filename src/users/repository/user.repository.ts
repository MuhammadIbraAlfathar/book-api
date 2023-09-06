import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datSource: DataSource) {
    super(User, datSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password } = createUserDto;

    const user = this.create();
    user.name = name;
    user.email = email;
    user.salt = await bycrypt.genSalt();
    user.password = password;
  }
}
