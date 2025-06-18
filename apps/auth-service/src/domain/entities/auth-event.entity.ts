import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { AuthUser } from './auth-user.entity';

export enum AuthEventType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  PASSWORD_CHANGE = 'password_change',
  OAUTH_CONNECT = 'oauth_connect',
  OAUTH_DISCONNECT = 'oauth_disconnect',
  FAILED_LOGIN = 'failed_login',
  ACCOUNT_LOCKED = 'account_locked',
  TOKEN_REFRESH = 'token_refresh',
}

@Entity('auth_events')
@Index(['user_id', 'event_type'])
@Index(['user_id', 'created_at'])
@Index(['event_type', 'created_at'])
export class AuthEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({
    type: 'enum',
    enum: AuthEventType,
  })
  event_type: AuthEventType;

  @Column({ type: 'varchar', nullable: true })
  provider: string;

  @Column({ type: 'varchar' })
  ip_address: string;

  @Column({ type: 'text' })
  user_agent: string;

  @Column({ type: 'varchar' })
  device_info: string;

  @Column({ type: 'boolean' })
  success: boolean;

  @Column({ type: 'varchar', nullable: true })
  failure_reason: string;

  @Column({ type: 'json' })
  metadata: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => AuthUser, (user) => user.auth_events)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;
}
