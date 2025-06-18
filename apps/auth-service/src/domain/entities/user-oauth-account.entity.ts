import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { AuthUser } from './auth-user.entity';
import { OauthProvider } from './oauth-provider.entity';

@Entity('user_oauth_accounts')
@Index(['user_id', 'provider_id'], { unique: true })
@Index(['provider_id', 'provider_user_id'], { unique: true })
export class UserOauthAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  provider_id: number;

  @Column({ type: 'varchar' })
  provider_user_id: string;

  @Column({ type: 'varchar' })
  provider_email: string;

  @Column({ type: 'varchar' })
  provider_username: string;

  @Column({ type: 'text' })
  access_token: string; // Encrypted

  @Column({ type: 'text' })
  refresh_token: string; // Encrypted

  @Column({ type: 'timestamp' })
  token_expires_at: Date;

  @Column({ type: 'json' })
  provider_data: Record<string, any>;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp' })
  connected_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relations
  @ManyToOne(() => AuthUser, (user) => user.oauth_accounts)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @ManyToOne(() => OauthProvider, (provider) => provider.oauth_accounts)
  @JoinColumn({ name: 'provider_id' })
  provider: OauthProvider;
} 