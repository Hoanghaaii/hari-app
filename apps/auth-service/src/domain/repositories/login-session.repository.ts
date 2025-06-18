import { LoginSession } from '../entities/login-session.entity';
import { SessionId } from '../value-objects/session-id.vo';

export interface LoginSessionRepository {
  findBySessionId(sessionId: SessionId): Promise<LoginSession | null>;
  findActiveByUserId(userId: number): Promise<LoginSession[]>;
  save(session: LoginSession): Promise<void>;
  endSession(sessionId: SessionId): Promise<void>;
  deleteExpired(): Promise<void>;
}
