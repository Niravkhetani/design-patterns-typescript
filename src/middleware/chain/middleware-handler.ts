import { Request, Response } from '../../common/interfaces';

export interface MiddlewareHandler {
  setNext(handler: MiddlewareHandler): MiddlewareHandler;
  handle(request: Request): Promise<Response | null>;
}
