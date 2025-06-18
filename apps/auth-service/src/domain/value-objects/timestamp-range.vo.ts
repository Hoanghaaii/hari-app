export class TimestampRange {
  constructor(
    public readonly start: Date,
    public readonly end: Date,
  ) {
    if (start >= end) throw new Error('Start time must be before end time');
  }

  includes(date: Date): boolean {
    return date >= this.start && date <= this.end;
  }

  isExpired(now: Date = new Date()): boolean {
    return now > this.end;
  }
}
