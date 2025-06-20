import { ProviderType } from '../value-objects/provider-type.vo';

export class OAuthProvider {
  private id: string;
  private userId: string;
  private provider: ProviderType;
  private providerUserId: string;
  private accessToken: string | null;
  private refreshToken: string | null;
  private expiresAt: Date | null;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    userId: string,
    provider: string,
    providerUserId: string,
    accessToken: string | null = null,
    refreshToken: string | null = null,
    expiresAt: Date | null = null,
    id?: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id || crypto.randomUUID();
    this.userId = userId;
    this.provider = new ProviderType(provider);
    this.providerUserId = providerUserId;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getProvider(): string {
    return this.provider.getValue();
  }

  getProviderUserId(): string {
    return this.providerUserId;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  getExpiresAt(): Date | null {
    return this.expiresAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
