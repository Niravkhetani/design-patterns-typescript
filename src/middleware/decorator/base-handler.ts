import { Request, Response } from '../../common/interfaces';
import { HttpHandler } from './http-decorator';

export class BaseHttpHandler implements HttpHandler {
  async handle(_request: Request): Promise<Response> {
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: { message: 'OK' },
    };
  }
}
