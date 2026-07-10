import { Request, Response } from '../../common/interfaces';
import { MiddlewareHandler } from './middleware-handler';

export abstract class AbstractHandler implements MiddlewareHandler {
  private nextHandler: MiddlewareHandler | null = null;

  setNext(handler: MiddlewareHandler): MiddlewareHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(request: Request): Promise<Response | null> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }

  protected abstract process(request: Request): Promise<Response | null>;
}
