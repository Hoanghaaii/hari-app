import { Email } from '../value-objects/email.vo';

export class User {
  private id: string;
  private email: Email;
  private passwordHash: string | null;
  private isActive: boolean;
  private isEmailVerified: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    email: string,
    passwordHash: string | null,
    id?: string,
    isActive: boolean = true,
    isEmailVerified: boolean = false,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id || crypto.randomUUID();
    this.email = new Email(email);
    this.passwordHash = passwordHash;
    this.isActive = isActive;
    this.isEmailVerified = isEmailVerified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getPasswordHash(): string | null {
    return this.passwordHash;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getIsEmailVerified(): boolean {
    return this.isEmailVerified;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  async changePassword(newPasswordHash: string): Promise<void> {
    this.passwordHash = newPasswordHash;
    this.updatedAt = new Date();
  }

  verifyEmail(): void {
    if (this.isEmailVerified) {
      throw new Error('Email already verified');
    }
    this.isEmailVerified = true;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    if (!this.isActive) {
      throw new Error('Account already deactivated');
    }
    this.isActive = false;
    this.updatedAt = new Date();
  }
}
