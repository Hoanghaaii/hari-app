import { AuthEventRepository } from '../repositories/auth-event.repository';
import { AuthEvent } from '../entities/auth-event.entity';

export interface TrackEventInput {
  userId: number;
  eventType: AuthEvent['eventType'];
  metadata?: Record<string, any>;
}

export class AuthTrackEventService {
  constructor(private readonly eventRepo: AuthEventRepository) {}

  async execute(input: TrackEventInput): Promise<void> {
    const event = new AuthEvent(
      undefined as any, // id sẽ được gán ở infra
      input.userId,
      input.eventType,
      undefined, // provider
      undefined, // ipAddress
      undefined, // userAgent
      undefined, // deviceInfo
      true, // success
      undefined, // failureReason
      input.metadata || {},
      new Date()
    );
    await this.eventRepo.save(event);
  }
}
