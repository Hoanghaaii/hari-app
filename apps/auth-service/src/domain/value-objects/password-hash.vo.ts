import * as argon2 from 'argon2';

export class PasswordHash {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static async create(password: string): Promise<PasswordHash> {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    const hash = await argon2.hash(password);
    return new PasswordHash(hash);
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  getValue(): string {
    return this.value;
  }
}
