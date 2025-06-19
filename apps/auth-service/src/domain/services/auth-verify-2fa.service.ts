import { TwoFactorAuthRepository } from '../repositories/two-fa.repository';
import { UserTwoFactorAuth } from '../entities/user-2fa.entity';

export interface Verify2FAInput {
  userId: number;
  code: string;
}

export class AuthVerify2FAService {
  constructor(private readonly twoFaRepo: TwoFactorAuthRepository) {}

  async execute(input: Verify2FAInput): Promise<boolean> {
    const entity = await this.twoFaRepo.findByUserId(input.userId);
    if (!entity || !entity.isEnabled) {
      throw new Error('2FA not enabled');
    }
    // TODO: Thực tế sẽ verify OTP, ở đây chỉ check backup code
    const ok = entity.backupCodes.verify(input.code);
    if (!ok) {
      throw new Error('Invalid 2FA code');
    }
    return true;
  }
}
