import { BackupCodes } from '../value-objects/backup-codes.vo';

export class UserTwoFactorAuth {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public secretKey: string,
    public backupCodes: BackupCodes,
    public isEnabled: boolean = false,
    public enabledAt?: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  enable() {
    this.isEnabled = true;
    this.enabledAt = new Date();
    this.updatedAt = new Date();
  }

  disable() {
    this.isEnabled = false;
    this.updatedAt = new Date();
  }
}
