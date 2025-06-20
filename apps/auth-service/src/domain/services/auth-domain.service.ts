import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';
import { PasswordHash } from '../value-objects/password-hash.vo';
import { Token } from '../value-objects/token.vo';
import { EmailVerification } from '../entities/email-verification.entity';
import { PasswordResetToken } from '../entities/password-reset-token.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { OAuthProvider } from '../entities/oauth-provider.entity';
import {
  UserRepository,
  OAuthProviderRepository,
  RefreshTokenRepository,
  EmailVerificationRepository,
  PasswordResetTokenRepository,
} from '../repositories/auth-repositories';

export class AuthDomainService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly oauthProviderRepo: OAuthProviderRepository,
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly emailVerificationRepo: EmailVerificationRepository,
    private readonly passwordResetTokenRepo: PasswordResetTokenRepository,
  ) {}

  // Đăng ký tài khoản
  async register(email: Email, passwordHash: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email.getValue());
    if (existing) throw new Error('Email already exists');
    const user = new User(email.getValue(), passwordHash);
    await this.userRepo.save(user);
    return user;
  }

  // Đăng nhập
  async validateLogin(email: Email, passwordHash: string): Promise<User> {
    const user = await this.userRepo.findByEmail(email.getValue());
    if (!user) throw new Error('User not found');
    if (!user.getIsActive()) throw new Error('User is not active');
    if (!user.getIsEmailVerified()) throw new Error('Email not verified');
    if (user.getPasswordHash() !== passwordHash) throw new Error('Invalid password');
    return user;
  }

  // Quên mật khẩu
  async createPasswordResetToken(userId: string, token: Token, expiresAt: Date): Promise<PasswordResetToken> {
    const passwordResetToken = new PasswordResetToken(userId, token, expiresAt);
    await this.passwordResetTokenRepo.save(passwordResetToken);
    return passwordResetToken;
  }

  async isPasswordResetTokenValid(token: string): Promise<boolean> {
    const resetToken = await this.passwordResetTokenRepo.findByToken(token);
    return !!resetToken && !resetToken.isExpired() && !resetToken.isUsed();
  }

  // Xác minh email
  async createEmailVerification(userId: string, token: Token, expiresAt: Date): Promise<EmailVerification> {
    const emailVerification = new EmailVerification(userId, token, expiresAt);
    await this.emailVerificationRepo.save(emailVerification);
    return emailVerification;
  }

  async isEmailVerificationValid(token: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationRepo.findByToken(token);
    return !!emailVerification && !emailVerification.isExpired();
  }

  async verifyEmail(userId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    user.verifyEmail();
    await this.userRepo.update(user);
    await this.emailVerificationRepo.invalidateByUserId(userId);
  }

  // Đổi mật khẩu
  async changePassword(userId: string, newPasswordHash: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    await user.changePassword(newPasswordHash);
    await this.userRepo.update(user);
  }

  // Đăng nhập bằng OAuth
  async linkOAuthProvider(userId: string, provider: string, providerUserId: string, accessToken?: string, refreshToken?: string, expiresAt?: Date): Promise<OAuthProvider> {
    const oauthProvider = new OAuthProvider(userId, provider, providerUserId, accessToken || null, refreshToken || null, expiresAt || null);
    await this.oauthProviderRepo.save(oauthProvider);
    return oauthProvider;
  }

  // Thu hồi refresh token
  async revokeRefreshToken(token: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepo.findByToken(token);
    if (!refreshToken) throw new Error('Refresh token not found');
    refreshToken.revoke();
    await this.refreshTokenRepo.revoke(refreshToken.getId());
  }

  async isRefreshTokenValid(token: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepo.findByToken(token);
    return !!refreshToken && !refreshToken.isExpired();
  }
} 