import { Email } from '../value-objects/email.vo';
import { HashedPassword } from '../value-objects/hashed-password.vo';

export class AuthUser {
  private constructor(
    public readonly id: number | undefined,
    public email: Email,
    public password: HashedPassword | null,
    public isActive: boolean = true,
    public isVerified: boolean = false,
    public emailVerifiedAt?: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  static create(email: Email, password: HashedPassword): AuthUser {
    return new AuthUser(
      undefined,
      email,
      password,
      true,
      false,
      undefined,
      new Date(),
      new Date()
    );
  }

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
