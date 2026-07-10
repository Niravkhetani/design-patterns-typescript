import { Request, Response } from '../../common/interfaces';
import { HttpHandler } from './http-decorator';
import { Logger } from '../../infrastructure/singleton/logger';

export class LoggingDecorator implements HttpHandler {
  constructor(private wrapper: HttpHandler) {}

  async handle(request: Request): Promise<Response> {
    Logger.getInstance().info(`[Decorator] ${request.method} ${request.path}`);
    const start = Date.now();
    const response = await this.wrapper.handle(request);
    Logger.getInstance().info(`[Decorator] Response: ${response.statusCode} (${Date.now() - start}ms)`);
    return response;
  }
}
