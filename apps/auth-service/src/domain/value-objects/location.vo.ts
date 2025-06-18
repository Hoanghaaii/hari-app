export class Location {
  constructor(
    public readonly country: string,
    public readonly city?: string,
  ) {
    if (!country) throw new Error('Country is required');
  }

  toString(): string {
    return this.city ? `${this.city}, ${this.country}` : this.country;
  }
}
