import { Email } from '../value-objects/email.vo';
import { HashedPassword } from '../value-objects/hashed-password.vo';

export class AuthUser {
  constructor(
    public readonly id: number,
    public email: Email,
    public password: HashedPassword | null,
    public isActive: boolean = true,
    public isVerified: boolean = false,
    public emailVerifiedAt?: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  verifyEmail(date: Date = new Date()) {
    this.isVerified = true;
    this.emailVerifiedAt = date;
    this.updatedAt = new Date();
  }

  deactivate() {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}
