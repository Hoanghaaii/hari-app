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

@Entity('refresh_tokens')
@Index(['user_id', 'device_info'])
@Index(['expires_at'])
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', unique: true })
  token_hash: string;

  @Column({ type: 'varchar' })
  device_info: string;

  @Column({ type: 'varchar' })
  ip_address: string;

  @Column({ type: 'text' })
  user_agent: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ type: 'boolean', default: false })
  is_revoked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  revoked_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => AuthUser, (user) => user.refresh_tokens)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;
} 