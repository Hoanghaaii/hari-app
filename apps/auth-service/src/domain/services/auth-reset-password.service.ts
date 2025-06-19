import { PasswordResetTokenRepository } from '../repositories/password-reset-token.repository';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { Token } from '../value-objects/token.vo';
import { HashedPassword } from '../value-objects/hashed-password.vo';

export interface ResetPasswordInput {
  userId: number;
  token: string;
  newPassword: string;
}

export class AuthResetPasswordService {
  constructor(
    private readonly tokenRepo: PasswordResetTokenRepository,
    private readonly userRepo: AuthUserRepository
  ) {}

  async execute(input: ResetPasswordInput): Promise<void> {
    const token = new Token(input.token);
    const entity = await this.tokenRepo.findByToken(token);
    if (!entity || entity.userId !== input.userId || entity.isExpired()) {
      throw new Error('Invalid or expired token');
    }
    const user = await this.userRepo.findById(input.userId);
    if (!user) throw new Error('User not found');
    user.password = await HashedPassword.hash(input.newPassword);
    await this.userRepo.update(user);
    entity.markUsed();
    await this.tokenRepo.markUsed(entity);
  }
}
