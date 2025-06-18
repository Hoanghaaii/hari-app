import { RefreshToken } from '../entities/refresh-token.entity';
import { Token } from '../value-objects/token.vo';

export interface RefreshTokenRepository {
  findByToken(token: Token): Promise<RefreshToken | null>;
  findByUserId(userId: number): Promise<RefreshToken[]>;
  save(token: RefreshToken): Promise<void>;
  revoke(token: RefreshToken): Promise<void>;
  deleteExpiredTokens(): Promise<void>;
}
