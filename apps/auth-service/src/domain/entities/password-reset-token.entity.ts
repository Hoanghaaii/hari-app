import { Token } from '../value-objects/token.vo';

export class PasswordResetToken {
  private id: string;
  private userId: string;
  private token: Token;
  private expiresAt: Date;
  private createdAt: Date;
  private usedAt: Date | null;

  constructor(
    userId: string,
    token: Token,
    expiresAt: Date,
    id?: string,
    createdAt: Date = new Date(),
    usedAt: Date | null = null,
  ) {
    this.id = id || crypto.randomUUID();
    this.userId = userId;
    this.token = token;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
    this.usedAt = usedAt;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getToken(): string {
    return this.token.getValue();
  }

  getExpiresAt(): Date {
    return this.expiresAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUsedAt(): Date | null {
    return this.usedAt;
  }

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }

  isUsed(): boolean {
    return !!this.usedAt;
  }

  markAsUsed(): void {
    if (this.usedAt) {
      throw new Error('Token already used');
    }
    this.usedAt = new Date();
  }
}
