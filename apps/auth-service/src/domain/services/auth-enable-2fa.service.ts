import { TwoFactorAuthRepository } from '../repositories/two-fa.repository';
import { UserTwoFactorAuth } from '../entities/user-2fa.entity';
import { BackupCodes } from '../value-objects/backup-codes.vo';

export interface Enable2FAInput {
  userId: number;
  secretKey: string;
  backupCodes: string[];
}

export class AuthEnable2FAService {
  constructor(private readonly twoFaRepo: TwoFactorAuthRepository) {}

  async execute(input: Enable2FAInput): Promise<UserTwoFactorAuth> {
    let entity = await this.twoFaRepo.findByUserId(input.userId);
    if (entity) {
      entity.secretKey = input.secretKey;
      entity.backupCodes = new BackupCodes(input.backupCodes);
      entity.enable();
      await this.twoFaRepo.update(entity);
    } else {
      entity = new UserTwoFactorAuth(
        undefined as any, // id sẽ được gán ở infra
        input.userId,
        input.secretKey,
        new BackupCodes(input.backupCodes),
        true,
        new Date(),
        new Date(),
        new Date()
      );
      await this.twoFaRepo.save(entity);
    }
    return entity;
  }
}
