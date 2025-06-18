import { AuthUser } from '../entities/auth-user.entity';
import { Email } from '../value-objects/email.vo';

export interface AuthUserRepository {
  findById(id: number): Promise<AuthUser | null>;
  findByEmail(email: Email): Promise<AuthUser | null>;
  save(user: AuthUser): Promise<void>;
  update(user: AuthUser): Promise<void>;
  delete(userId: number): Promise<void>;
}
