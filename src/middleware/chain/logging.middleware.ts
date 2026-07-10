import { Request, Response } from '../../common/interfaces';
import { AbstractHandler } from './abstract-handler';
import { Logger } from '../../infrastructure/singleton/logger';

export class LoggingMiddleware extends AbstractHandler {
  async handle(request: Request): Promise<Response | null> {
    Logger.getInstance().info(`LoggingMiddleware: ${request.method} ${request.path} [${request.id}]`);
    const start = Date.now();
    const response = await super.handle(request);
    const duration = Date.now() - start;
    Logger.getInstance().info(`LoggingMiddleware: ${request.method} ${request.path} completed in ${duration}ms`);
    return response;
  }

  protected async process(_request: Request): Promise<Response | null> {
    return null;
  }
}
