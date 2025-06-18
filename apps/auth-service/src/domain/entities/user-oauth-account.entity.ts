import { Email } from '../value-objects/email.vo';
import { Token } from '../value-objects/token.vo';

export class UserOAuthAccount {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly providerId: number,
    public providerUserId: string,
    public providerEmail: Email,
    public providerUsername: string,
    public accessToken: Token,
    public refreshToken: Token,
    public tokenExpiresAt: Date,
    public providerData: Record<string, any>,
    public isActive: boolean = true,
    public connectedAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
