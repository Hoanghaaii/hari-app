import { Token } from '../value-objects/token.vo';

export class EmailVerification {
  private id: string;
  private userId: string;
  private token: Token;
  private expiresAt: Date;
  private createdAt: Date;

  constructor(
    userId: string,
    token: Token,
    expiresAt: Date,
    id?: string,
    createdAt: Date = new Date(),
  ) {
    this.id = id || crypto.randomUUID();
    this.userId = userId;
    this.token = token;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
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

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}
