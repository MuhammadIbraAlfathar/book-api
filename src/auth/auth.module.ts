import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConfig } from 'src/books/config/jwt.config';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [AuthService],
})
export class AuthModule {}
