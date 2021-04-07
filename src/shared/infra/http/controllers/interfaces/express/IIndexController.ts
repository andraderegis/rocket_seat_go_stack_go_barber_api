import { Request, Response } from 'express';

export default interface IIndexController {
  index(request: Request, response: Response): Promise<Response>;
}
