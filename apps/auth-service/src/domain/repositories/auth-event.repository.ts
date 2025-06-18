import { AuthEvent } from '../entities/auth-event.entity';

export interface AuthEventRepository {
  save(event: AuthEvent): Promise<void>;
  findRecentByUserId(userId: number, limit: number): Promise<AuthEvent[]>;
}
