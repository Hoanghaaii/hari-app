import { RateLimit } from '../entities/rate-limit.entity';

export interface RateLimitRepository {
  findByIdentifierAndAction(
    identifier: string,
    action: string,
  ): Promise<RateLimit | null>;
  saveOrUpdate(rateLimit: RateLimit): Promise<void>;
  reset(identifier: string, action: string): Promise<void>;
}
