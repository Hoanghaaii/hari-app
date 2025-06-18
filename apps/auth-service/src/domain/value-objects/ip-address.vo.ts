export class IpAddress {
  private readonly value: string;

  constructor(ip: string) {
    if (!this.isValid(ip)) {
      throw new Error('Invalid IP address');
    }
    this.value = ip;
  }

  private isValid(ip: string): boolean {
    return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip) || /^[a-fA-F0-9:]+$/.test(ip);
  }

  getValue(): string {
    return this.value;
  }
}
