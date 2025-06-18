import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserOauthAccount } from './user-oauth-account.entity';
import { RefreshToken } from './refresh-token.entity';
import { PasswordResetToken } from './password-reset-token.entity';
import { EmailVerificationToken } from './email-verification-token.entity';
import { LoginSession } from './login-session.entity';
import { AuthEvent } from './auth-event.entity';
import { User2fa } from './user-2fa.entity';

@Entity('auth_users')
export class AuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string; // Hashed password (local auth)

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relations
  @OneToMany(() => UserOauthAccount, (oauthAccount) => oauthAccount.user)
  oauth_accounts: UserOauthAccount[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refresh_tokens: RefreshToken[];

  @OneToMany(() => PasswordResetToken, (resetToken) => resetToken.user)
  password_reset_tokens: PasswordResetToken[];

  @OneToMany(() => EmailVerificationToken, (verificationToken) => verificationToken.user)
  email_verification_tokens: EmailVerificationToken[];

  @OneToMany(() => LoginSession, (session) => session.user)
  login_sessions: LoginSession[];

  @OneToMany(() => AuthEvent, (event) => event.user)
  auth_events: AuthEvent[];

  @OneToOne(() => User2fa, (user2fa) => user2fa.user)
  user_2fa: User2fa;
} 