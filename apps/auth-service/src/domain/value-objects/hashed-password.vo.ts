export class HashedPassword {
  private readonly value: string;

  constructor(hash: string) {
    if (!hash || hash.length < 20) {
      throw new Error('Invalid hashed password');
    }
    this.value = hash;
  }

  static async hash(plain: string): Promise<HashedPassword> {
    // TODO: Replace with real hash logic (e.g., bcrypt)
    const hash = 'hashed_' + plain.padEnd(20, '_');
    return new HashedPassword(hash);
  }

  static async verify(plain: string, hashed: HashedPassword): Promise<boolean> {
    // TODO: Replace with real verify logic (e.g., bcrypt.compare)
    const hash = 'hashed_' + plain.padEnd(20, '_');
    return hash === hashed.getValue();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: HashedPassword): boolean {
    return this.value === other.getValue();
  }
}
