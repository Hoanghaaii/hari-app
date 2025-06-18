export class UserAgent {
  constructor(private readonly value: string) {
    if (!value || value.length < 5) {
      throw new Error('Invalid user agent');
    }
  }

  getValue(): string {
    return this.value;
  }
}
