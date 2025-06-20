import { User } from '../entities/user.entity';
import { OAuthProvider } from '../entities/oauth-provider.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { EmailVerification } from '../entities/email-verification.entity';
import { PasswordResetToken } from '../entities/password-reset-token.entity';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface OAuthProviderRepository {
  findById(id: string): Promise<OAuthProvider | null>;
  findByUserAndProvider(userId: string, provider: string): Promise<OAuthProvider | null>;
  findByProviderUserId(providerUserId: string): Promise<OAuthProvider | null>;
  save(oauthProvider: OAuthProvider): Promise<OAuthProvider>;
  update(oauthProvider: OAuthProvider): Promise<OAuthProvider>;
}

export interface RefreshTokenRepository {
  findById(id: string): Promise<RefreshToken | null>;
  findByToken(token: string): Promise<RefreshToken | null>;
  save(refreshToken: RefreshToken): Promise<RefreshToken>;
  revoke(id: string): Promise<void>;
}

export interface EmailVerificationRepository {
  findById(id: string): Promise<EmailVerification | null>;
  findByToken(token: string): Promise<EmailVerification | null>;
  save(emailVerification: EmailVerification): Promise<EmailVerification>;
  delete(id: string): Promise<void>;
  invalidateByUserId(userId: string): Promise<void>;
}

export interface PasswordResetTokenRepository {
  findById(id: string): Promise<PasswordResetToken | null>;
  findByToken(token: string): Promise<PasswordResetToken | null>;
  save(passwordResetToken: PasswordResetToken): Promise<PasswordResetToken>;
  markUsed(id: string): Promise<void>;
  invalidateByUserId(userId: string): Promise<void>;
} 