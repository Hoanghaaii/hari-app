import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserOauthAccount } from './user-oauth-account.entity';

@Entity('oauth_providers')
export class OauthProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string; // google, github, etc.

  @Column({ type: 'varchar' })
  client_id: string;

  @Column({ type: 'varchar' })
  client_secret: string; // Encrypted

  @Column({ type: 'varchar' })
  redirect_uri: string;

  @Column({ type: 'varchar' })
  scope: string;

  @Column({ type: 'varchar' })
  auth_url: string;

  @Column({ type: 'varchar' })
  token_url: string;

  @Column({ type: 'varchar' })
  user_info_url: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relations
  @OneToMany(() => UserOauthAccount, (oauthAccount) => oauthAccount.provider)
  oauth_accounts: UserOauthAccount[];
} 