export class HashedPassword {
  private readonly value: string;

  constructor(hash: string) {
    if (!hash || hash.length < 20) {
      throw new Error('Invalid hashed password');
    }
    this.value = hash;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: HashedPassword): boolean {
    return this.value === other.getValue();
  }
}
