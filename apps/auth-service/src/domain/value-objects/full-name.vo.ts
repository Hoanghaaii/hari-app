export class FullName {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
  ) {
    if (!firstName || !lastName) {
      throw new Error('First name and last name are required');
    }
  }

  getValue(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
