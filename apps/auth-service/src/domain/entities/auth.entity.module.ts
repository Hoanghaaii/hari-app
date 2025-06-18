import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './auth-user.entity';
import { AuthEvent } from './auth-event.entity';
import { UserOauthAccount } from './user-oauth-account.entity';
import { OauthProvider } from './oauth-provider.entity';
import { RefreshToken } from './refresh-token.entity';
import { PasswordResetToken } from './password-reset-token.entity';
import { EmailVerificationToken } from './email-verification-token.entity';
import { LoginSession } from './login-session.entity';
import { User2fa } from './user-2fa.entity';
import { RateLimit } from './rate-limit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthUser,
      AuthEvent,
      UserOauthAccount,
      OauthProvider,
      RefreshToken,
      PasswordResetToken,
      EmailVerificationToken,
      LoginSession,
      User2fa,
      RateLimit,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class AuthEntityModule {}
