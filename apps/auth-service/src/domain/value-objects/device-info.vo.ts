export class DeviceInfo {
  constructor(private readonly value: string) {
    if (!value || value.length < 2) {
      throw new Error('Invalid device info');
    }
  }

  getValue(): string {
    return this.value;
  }
}
