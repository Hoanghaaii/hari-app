import { EmailVerificationToken } from '../entities/email-verification-token.entity';
import { Token } from '../value-objects/token.vo';

export interface EmailVerificationTokenRepository {
  findByToken(token: Token): Promise<EmailVerificationToken | null>;
  save(token: EmailVerificationToken): Promise<void>;
  markVerified(token: EmailVerificationToken): Promise<void>;
}
