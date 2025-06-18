import { PasswordResetToken } from '../entities/password-reset-token.entity';
import { Token } from '../value-objects/token.vo';

export interface PasswordResetTokenRepository {
  findByToken(token: Token): Promise<PasswordResetToken | null>;
  save(token: PasswordResetToken): Promise<void>;
  markUsed(token: PasswordResetToken): Promise<void>;
}
