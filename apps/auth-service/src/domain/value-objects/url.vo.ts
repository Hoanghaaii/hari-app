export class Url {
  private readonly value: string;

  constructor(value: string) {
    try {
      new URL(value);
      this.value = value;
    } catch {
      throw new Error('Invalid URL');
    }
  }

  getValue(): string {
    return this.value;
  }
}
