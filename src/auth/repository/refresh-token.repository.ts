import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from '../entity/refresh-token.entity';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }
  async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const refreshToken = this.create();
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + ttl);
    refreshToken.isRevoked = false;
    refreshToken.expiredAt = expiredAt;
    refreshToken.user = user;

    return await refreshToken.save();
  }
}
