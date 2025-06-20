import { randomBytes } from 'crypto';

export class Token {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static generate(): Token {
    const token = randomBytes(32).toString('hex');
    return new Token(token);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Token): boolean {
    return this.value === other.value;
  }
}
