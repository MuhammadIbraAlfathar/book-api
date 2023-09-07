import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConfig } from 'src/books/config/jwt.config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register(jwtConfig), UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
