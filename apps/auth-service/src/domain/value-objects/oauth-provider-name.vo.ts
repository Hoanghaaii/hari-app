export class OAuthProviderName {
  private static readonly allowed = ['google', 'facebook', 'github'];

  constructor(private readonly value: string) {
    if (!OAuthProviderName.allowed.includes(value)) {
      throw new Error(`Unsupported OAuth provider: ${value}`);
    }
  }

  getValue(): string {
    return this.value;
  }
}
