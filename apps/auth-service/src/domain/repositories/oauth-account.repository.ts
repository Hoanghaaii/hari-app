import { UserOAuthAccount } from '../entities/user-oauth-account.entity';

export interface OAuthAccountRepository {
  findByUserIdAndProvider(
    userId: number,
    providerId: number,
  ): Promise<UserOAuthAccount | null>;
  findByProviderIdAndProviderUserId(
    providerId: number,
    providerUserId: string,
  ): Promise<UserOAuthAccount | null>;
  save(account: UserOAuthAccount): Promise<void>;
  update(account: UserOAuthAccount): Promise<void>;
}
