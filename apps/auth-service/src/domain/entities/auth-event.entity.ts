import { IpAddress } from '../value-objects/ip-address.vo';
import { UserAgent } from '../value-objects/user-agent.vo';
import { DeviceInfo } from '../value-objects/device-info.vo';

export class AuthEvent {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly eventType:
      | 'login'
      | 'logout'
      | 'password_change'
      | 'oauth_connect'
      | 'oauth_disconnect'
      | 'failed_login'
      | 'account_locked'
      | 'token_refresh',
    public readonly provider?: string,
    public readonly ipAddress?: IpAddress,
    public readonly userAgent?: UserAgent,
    public readonly deviceInfo?: DeviceInfo,
    public readonly success: boolean = true,
    public readonly failureReason?: string,
    public readonly metadata: Record<string, any> = {},
    public readonly createdAt: Date = new Date(),
  ) {}
}
