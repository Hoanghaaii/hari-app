import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AuthUser } from './auth-user.entity';

@Entity('user_2fa')
export class User2fa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  user_id: number;

  @Column({ type: 'varchar' })
  secret_key: string;

  @Column({ type: 'text' })
  backup_codes: string;

  @Column({ type: 'boolean', default: false })
  is_enabled: boolean;

  @Column({ type: 'timestamp', nullable: true })
  enabled_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relations
  @OneToOne(() => AuthUser, (user) => user.user_2fa)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;
} 