export class SessionId {
  constructor(private readonly value: string) {
    if (!value || value.length < 10) {
      throw new Error('Invalid session ID');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: SessionId): boolean {
    return this.value === other.getValue();
  }
}
