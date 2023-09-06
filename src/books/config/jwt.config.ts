import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'kodenuklir',
  signOptions: {
    expiresIn: 60,
  },
};
