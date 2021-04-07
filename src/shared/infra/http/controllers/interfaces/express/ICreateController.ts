import { Request, Response } from 'express';

export default interface ICreateController {
  create(request: Request, response: Response): Promise<Response>;
}
