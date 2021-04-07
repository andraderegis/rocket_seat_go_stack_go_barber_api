import { Request, Response } from 'express';

export default interface IUpdateController {
  update(request: Request, response: Response): Promise<Response>;
}
