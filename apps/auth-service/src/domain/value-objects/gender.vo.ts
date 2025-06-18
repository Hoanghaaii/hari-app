export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export class GenderVO {
  constructor(private readonly value: Gender) {
    const allowed: Gender[] = ['male', 'female', 'other', 'prefer_not_to_say'];
    if (!allowed.includes(value)) {
      throw new Error(`Invalid gender: ${value}`);
    }
  }

  getValue(): Gender {
    return this.value;
  }
}
