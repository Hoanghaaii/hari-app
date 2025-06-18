export class RateLimit {
  constructor(
    public readonly id: number,
    public readonly identifier: string,
    public readonly action: string,
    public attempts: number = 0,
    public windowStart: Date = new Date(),
    public blockedUntil?: Date,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  incrementAttempt() {
    this.attempts += 1;
    this.updatedAt = new Date();
  }

  resetAttempts() {
    this.attempts = 0;
    this.windowStart = new Date();
    this.updatedAt = new Date();
  }

  blockUntil(date: Date) {
    this.blockedUntil = date;
    this.updatedAt = new Date();
  }

  isBlocked(now = new Date()): boolean {
    return !!this.blockedUntil && now < this.blockedUntil;
  }
}
