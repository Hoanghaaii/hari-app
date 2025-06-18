import { Token } from '../value-objects/token.vo';
import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { DeviceInfo } from '../value-objects/device-info.vo';

export class RefreshToken {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public token: Token,
    public deviceInfo: DeviceInfo,
    public ipAddress: IpAddress,
    public userAgent: UserAgent,
    public expiresAt: Date,
    public isRevoked: boolean = false,
    public revokedAt?: Date,
    public createdAt: Date = new Date(),
  ) {}

  revoke(date: Date = new Date()) {
    this.isRevoked = true;
    this.revokedAt = date;
  }
}
