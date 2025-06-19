import { EmailVerificationTokenRepository } from '../repositories/email-verification-token.repository';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { Token } from '../value-objects/token.vo';

export interface VerifyEmailInput {
  userId: number;
  token: string;
}

export class AuthVerifyEmailService {
  constructor(
    private readonly tokenRepo: EmailVerificationTokenRepository,
    private readonly userRepo: AuthUserRepository
  ) {}

  async execute(input: VerifyEmailInput): Promise<void> {
    const token = new Token(input.token);
    const entity = await this.tokenRepo.findByToken(token);
    if (!entity || entity.userId !== input.userId || entity.isExpired()) {
      throw new Error('Invalid or expired token');
    }
    entity.markVerified();
    await this.tokenRepo.markVerified(entity);
    const user = await this.userRepo.findById(input.userId);
    if (!user) throw new Error('User not found');
    user.verifyEmail();
    await this.userRepo.update(user);
  }
}
