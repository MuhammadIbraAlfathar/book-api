import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    user.password = await bycrypt.hash(password, user.salt);

    try {
      await user.save();
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException(`Email ${email} already exist`);
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findOne({ where: { email: email } });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }
}
