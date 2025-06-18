import { Token } from '../value-objects/token.vo';

export class PasswordResetToken {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public token: Token,
    public expiresAt: Date,
    public usedAt?: Date,
    public createdAt: Date = new Date(),
  ) {}

  isExpired(current = new Date()): boolean {
    return current > this.expiresAt;
  }

  markUsed(date: Date = new Date()) {
    this.usedAt = date;
  }
}
