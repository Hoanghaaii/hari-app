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

export enum LoginMethod {
  PASSWORD = 'password',
  OAUTH = 'oauth',
  SSO = 'sso',
}

@Entity('login_sessions')
@Index(['user_id', 'is_active'])
@Index(['session_id'])
@Index(['expires_at'])
export class LoginSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', unique: true })
  session_id: string;

  @Column({ type: 'varchar' })
  ip_address: string;

  @Column({ type: 'text' })
  user_agent: string;

  @Column({ type: 'varchar' })
  device_info: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({
    type: 'enum',
    enum: LoginMethod,
    default: LoginMethod.PASSWORD,
  })
  login_method: LoginMethod;

  @Column({ type: 'varchar', nullable: true })
  oauth_provider: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  ended_at: Date;

  // Relations
  @ManyToOne(() => AuthUser, (user) => user.login_sessions)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;
} 