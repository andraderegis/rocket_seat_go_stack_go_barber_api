import { Request, Response } from 'express';

export default interface IGetController {
  get(request: Request, response: Response): Promise<Response>;
}
