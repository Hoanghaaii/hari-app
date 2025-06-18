import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('rate_limits')
@Index(['identifier', 'action'])
@Index(['blocked_until'])
export class RateLimit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  identifier: string;

  @Column({ type: 'varchar' })
  action: string;

  @Column({ type: 'int', default: 0 })
  attempts: number;

  @Column({ type: 'timestamp' })
  window_start: Date;

  @Column({ type: 'timestamp', nullable: true })
  blocked_until: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
} 