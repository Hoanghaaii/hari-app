import { Token } from '../value-objects/token.vo';

export class EmailVerificationToken {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public token: Token,
    public expiresAt: Date,
    public verifiedAt?: Date,
    public createdAt: Date = new Date(),
  ) {}

  isExpired(now = new Date()): boolean {
    return now > this.expiresAt;
  }

  markVerified(date: Date = new Date()) {
    this.verifiedAt = date;
  }
}
