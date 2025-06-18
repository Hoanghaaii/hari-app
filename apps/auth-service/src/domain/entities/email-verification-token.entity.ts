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

@Entity('email_verification_tokens')
@Index(['token_hash'])
@Index(['expires_at'])
export class EmailVerificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', unique: true })
  token_hash: string;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  verified_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => AuthUser, (user) => user.email_verification_tokens)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;
} 