import { Request, Response } from '../../common/interfaces';
import { AbstractHandler } from './abstract-handler';
import { Logger } from '../../infrastructure/singleton/logger';

export class AuthMiddleware extends AbstractHandler {
  async handle(request: Request): Promise<Response | null> {
    const token = request.headers['authorization'];
    if (!token) {
      Logger.getInstance().warn(`AuthMiddleware: No token for request ${request.id}`);
      return {
        statusCode: 401,
        headers: { 'content-type': 'application/json' },
        body: { error: 'Unauthorized' },
      };
    }
    Logger.getInstance().info(`AuthMiddleware: Token validated for request ${request.id}`);
    return super.handle(request);
  }

  protected async process(_request: Request): Promise<Response | null> {
    return null;
  }
}
