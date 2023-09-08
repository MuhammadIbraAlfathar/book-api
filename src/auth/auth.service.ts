import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interface/login-response.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { refreshTokenConfig } from 'src/books/config/jwt.config';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(RefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Wrong email and password');
    }

    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);

    return { access_token, refresh_token } as LoginResponse;
  }

  async refreshAccessToken(
    refreshToken: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshToken;
    const payload = await this.decodeToken(refresh_token);
    const findToken = await this.refreshTokenRepository.findOne({
      where: { id: payload.jid },
      relations: { user: true },
    });

    if (!findToken) {
      throw new UnauthorizedException('Refresh token is not found');
    }

    if (findToken.isRevoked) {
      throw new UnauthorizedException('Refresh token has been revoked');
    }

    const access_token = await this.createAccessToken(findToken.user);
    return { access_token };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token is expired');
      } else {
        throw new InternalServerErrorException('Failed to decode token');
      }
    }
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return access_token;
  }

  async createRefreshToken(user: User): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      3600 * 24,
    );

    const payload = {
      jid: refreshToken.id,
    };

    const refresh_token = await this.jwtService.signAsync(
      payload,
      refreshTokenConfig,
    );

    return refresh_token;
  }
}
