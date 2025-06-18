import { UserTwoFactorAuth } from '../entities/user-2fa.entity';

export interface TwoFactorAuthRepository {
  findByUserId(userId: number): Promise<UserTwoFactorAuth | null>;
  save(entity: UserTwoFactorAuth): Promise<void>;
  update(entity: UserTwoFactorAuth): Promise<void>;
}
