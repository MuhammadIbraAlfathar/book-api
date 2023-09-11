import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConfig } from 'src/books/config/jwt.config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payLoad: any) {
    const user = await this.userService.findUserById(payLoad.sub);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
}
