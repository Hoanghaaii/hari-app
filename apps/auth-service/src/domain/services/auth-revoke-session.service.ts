import { LoginSessionRepository } from '../repositories/login-session.repository';
import { SessionId } from '../value-objects/session-id.vo';

export interface RevokeSessionInput {
  sessionId: string;
}

export class AuthRevokeSessionService {
  constructor(private readonly sessionRepo: LoginSessionRepository) {}

  async execute(input: RevokeSessionInput): Promise<void> {
    const sessionId = new SessionId(input.sessionId);
    await this.sessionRepo.endSession(sessionId);
  }
}
