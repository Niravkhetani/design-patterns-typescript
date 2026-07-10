import { Request, Response } from '../../common/interfaces';

export interface HttpHandler {
  handle(request: Request): Promise<Response>;
}
