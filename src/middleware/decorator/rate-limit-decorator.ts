import { Request, Response } from '../../common/interfaces';
import { HttpHandler } from './http-decorator';
import { Logger } from '../../infrastructure/singleton/logger';

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 100;
const WINDOW_MS = 60000;

export class RateLimitDecorator implements HttpHandler {
  constructor(private wrapper: HttpHandler) {}

  async handle(request: Request): Promise<Response> {
    const key = request.userId || request.ip || 'anonymous';
    const now = Date.now();
    let record = requestCounts.get(key);

    if (!record || now > record.resetAt) {
      record = { count: 0, resetAt: now + WINDOW_MS };
      requestCounts.set(key, record);
    }

    record.count++;
    if (record.count > LIMIT) {
      Logger.getInstance().warn(`[RateLimit] User ${key} exceeded limit`);
      return {
        statusCode: 429,
        headers: { 'content-type': 'application/json', 'retry-after': String(Math.ceil((record.resetAt - now) / 1000)) },
        body: { error: 'Too many requests' },
      };
    }

    Logger.getInstance().info(`[RateLimit] User ${key}: ${record.count}/${LIMIT}`);
    return this.wrapper.handle(request);
  }
}
