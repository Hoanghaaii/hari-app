export class BackupCodes {
  private readonly codes: string[];

  constructor(codes: string[]) {
    if (!Array.isArray(codes) || codes.length < 5) {
      throw new Error('At least 5 backup codes are required');
    }
    this.codes = codes;
  }

  getValues(): string[] {
    return [...this.codes];
  }

  verify(code: string): boolean {
    return this.codes.includes(code);
  }

  remove(code: string): BackupCodes {
    const remaining = this.codes.filter((c) => c !== code);
    return new BackupCodes(remaining);
  }
}
