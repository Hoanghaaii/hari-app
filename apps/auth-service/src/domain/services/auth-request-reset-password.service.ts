import { PasswordResetTokenRepository } from '../repositories/password-reset-token.repository';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { Token } from '../value-objects/token.vo';
import { PasswordResetToken } from '../entities/password-reset-token.entity';
import { Email } from '../value-objects/email.vo';

export interface RequestResetPasswordInput {
  email: string;
}

export class AuthRequestResetPasswordService {
  constructor(
    private readonly tokenRepo: PasswordResetTokenRepository,
    private readonly userRepo: AuthUserRepository
  ) {}

  async execute(input: RequestResetPasswordInput): Promise<void> {
    const email = new Email(input.email);
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('User not found');
    // Sinh token ngẫu nhiên, thực tế nên dùng crypto
    const token = new Token(Math.random().toString(36).padEnd(20, '_'));
    const entity = new PasswordResetToken(
      undefined as any,
      user.id!,
      token,
      new Date(Date.now() + 1000 * 60 * 15), // 15 phút
      undefined,
      new Date()
    );
    await this.tokenRepo.save(entity);
  }
}
