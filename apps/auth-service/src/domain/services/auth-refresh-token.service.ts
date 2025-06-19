import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { RefreshToken } from '../entities/refresh-token.entity';
import { Token } from '../value-objects/token.vo';

export interface RefreshTokenInput {
  refreshToken: string;
}

export class AuthRefreshTokenService {
  constructor(private readonly refreshTokenRepo: RefreshTokenRepository) {}

  async execute(input: RefreshTokenInput): Promise<RefreshToken> {
    const token = new Token(input.refreshToken);
    const entity = await this.refreshTokenRepo.findByToken(token);
    if (!entity || entity.isRevoked || entity.isExpired()) {
      throw new Error('Invalid or expired refresh token');
    }
    return entity;
  }
}
