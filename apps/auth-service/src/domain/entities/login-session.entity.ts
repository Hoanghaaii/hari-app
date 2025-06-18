import { SessionId } from '../value-objects/session-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { DeviceInfo } from '../value-objects/device-info.vo';

export class LoginSession {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public sessionId: SessionId,
    public ipAddress: IpAddress,
    public userAgent: UserAgent,
    public deviceInfo: DeviceInfo,
    public location: string,
    public loginMethod: 'password' | 'oauth' | 'sso',
    public isActive: boolean = true,
    public expiresAt: Date,
    public createdAt: Date = new Date(),
    public endedAt?: Date,
    public oauthProvider?: string,
  ) {}

  endSession(date: Date = new Date()) {
    this.isActive = false;
    this.endedAt = date;
  }

  isExpired(now = new Date()): boolean {
    return now > this.expiresAt;
  }
}
