import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConfig } from 'src/books/config/jwt.config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refresh-token.entity';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { JwtStartegy } from './jwt.startegy';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    UsersModule,
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [AuthService, RefreshTokenRepository, JwtStartegy],
  controllers: [AuthController],
})
export class AuthModule {}
