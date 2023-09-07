import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Wrong email and password');
    }

    const access_token = this.createAccessToken(user);

    return access_token;
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return access_token;
  }
}
