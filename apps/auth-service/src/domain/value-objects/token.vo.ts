export class Token {
  private readonly hash: string;

  constructor(hash: string) {
    if (!hash || hash.length < 20) {
      throw new Error('Invalid token hash');
    }
    this.hash = hash;
  }

  getValue(): string {
    return this.hash;
  }

  equals(other: Token): boolean {
    return this.hash === other.getValue();
  }
}
