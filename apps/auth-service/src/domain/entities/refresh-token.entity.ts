import { Token } from '../value-objects/token.vo';

export class RefreshToken {
  private id: string;
  private userId: string;
  private token: Token;
  private expiresAt: Date;
  private createdAt: Date;
  private revokedAt: Date | null;

  constructor(
    userId: string,
    token: Token,
    expiresAt: Date,
    id?: string,
    createdAt: Date = new Date(),
    revokedAt: Date | null = null,
  ) {
    this.id = id || crypto.randomUUID();
    this.userId = userId;
    this.token = token;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
    this.revokedAt = revokedAt;
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

  getRevokedAt(): Date | null {
    return this.revokedAt;
  }

  isExpired(): boolean {
    return this.expiresAt < new Date() || !!this.revokedAt;
  }

  revoke(): void {
    if (this.revokedAt) {
      throw new Error('Token already revoked');
    }
    this.revokedAt = new Date();
  }
}
