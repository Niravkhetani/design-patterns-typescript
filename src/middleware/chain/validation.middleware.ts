import { Request, Response } from '../../common/interfaces';
import { AbstractHandler } from './abstract-handler';
import { Logger } from '../../infrastructure/singleton/logger';

export class ValidationMiddleware extends AbstractHandler {
  async handle(request: Request): Promise<Response | null> {
    if (!request.body || typeof request.body !== 'object') {
      Logger.getInstance().warn(`ValidationMiddleware: Invalid body for request ${request.id}`);
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: { error: 'Invalid request body' },
      };
    }
    Logger.getInstance().info(`ValidationMiddleware: Body validated for request ${request.id}`);
    return super.handle(request);
  }

  protected async process(_request: Request): Promise<Response | null> {
    return null;
  }
}
