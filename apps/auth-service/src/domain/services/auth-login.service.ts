import { AuthUserRepository } from '../repositories/auth-user.repository';
import { AuthUser } from '../entities/auth-user.entity';
import { Email } from '../value-objects/email.vo';
import { HashedPassword } from '../value-objects/hashed-password.vo';

export interface LoginInput {
  email: string;
  password: string;
}

export class AuthLoginService {
  constructor(private readonly userRepo: AuthUserRepository) {}

  async execute(input: LoginInput): Promise<AuthUser> {
    const email = new Email(input.email);
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }
    const ok = await HashedPassword.verify(input.password, user.password);
    if (!ok) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
