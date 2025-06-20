export class ProviderType {
  private readonly value: 'google' | 'facebook';

  constructor(value: string) {
    if (!['google', 'facebook'].includes(value)) {
      throw new Error('Invalid OAuth provider');
    }
    this.value = value as 'google' | 'facebook';
  }

  getValue(): 'google' | 'facebook' {
    return this.value;
  }

  equals(other: ProviderType): boolean {
    return this.value === other.value;
  }
}
