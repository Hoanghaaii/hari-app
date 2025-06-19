import { AuthUserRepository } from '../repositories/auth-user.repository';
import { AuthUser } from '../entities/auth-user.entity';
import { Email } from '../value-objects/email.vo';
import { HashedPassword } from '../value-objects/hashed-password.vo';

export interface RegisterInput {
  email: string;
  password: string; // plain password
}

export class AuthRegisterService {
  constructor(private readonly userRepo: AuthUserRepository) {}

  async execute(input: RegisterInput): Promise<AuthUser> {
    const email = new Email(input.email);
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }
    const hashedPassword = await HashedPassword.hash(input.password);
    const user = AuthUser.create(email, hashedPassword);
    await this.userRepo.save(user);
    return user;
  }
}
